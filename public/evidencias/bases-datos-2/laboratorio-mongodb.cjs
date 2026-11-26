// Ejecutar con Node.js y el paquete mongodb instalado junto al archivo.
// Usa un servidor MongoDB local y una base de datos temporal de esta práctica.
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { MongoClient } = require('mongodb');

async function main() {
    const port = process.env.BD2_MONGO_PORT || '27017';
    if (!/^\d{1,5}$/.test(port)) throw new Error('Puerto inválido');
    const client = new MongoClient('mongodb://127.0.0.1:' + port, { serverSelectionTimeoutMS: 3000 });
    await client.connect();
    const db = client.db('bd2_lab_' + randomUUID().replaceAll('-', ''));

    try {
        const listings = db.collection('alojamientos');
        await listings.insertMany([
            { _id: 1, ciudad: 'Bogotá', precio: 90, servicios: ['Wifi'] },
            { _id: 2, ciudad: 'Bogotá', precio: 70, servicios: ['Wifi', 'Cocina'] },
            { _id: 3, ciudad: 'Cali', precio: 60, servicios: ['Cocina'] },
        ]);
        const filter = { ciudad: 'Bogotá', servicios: 'Wifi' };
        const findListings = () => listings.find(filter).sort({ precio: 1 });
        const matches = await findListings().toArray();
        assert.deepEqual(matches.map(({ _id }) => _id), [2, 1]);
        const statsBefore = await findListings().explain('executionStats');
        const index = await listings.createIndex({ ciudad: 1, precio: 1 });
        const statsAfter = await findListings().hint(index).explain('executionStats');
        assert.equal(statsBefore.executionStats.nReturned, statsAfter.executionStats.nReturned);
        assert.equal(statsBefore.executionStats.totalDocsExamined, 3);
        assert.equal(statsAfter.executionStats.totalDocsExamined, 2);

        const update = await listings.updateOne({ _id: 1 }, { $addToSet: { servicios: 'Cocina' } });
        assert.equal(update.modifiedCount, 1);
        assert.deepEqual((await listings.findOne({ _id: 1 })).servicios, ['Wifi', 'Cocina']);
        console.log('Alojamientos: ids 2 y 1. Cocina añadida al alojamiento 1.');
        console.log('Documentos examinados: 3 sin índice, 2 al forzar el índice compuesto.');

        const movies = db.collection('peliculas');
        await movies.insertMany([
            { _id: 1, titulo: 'Horizonte' },
            { _id: 2, titulo: 'La estación' },
        ]);
        await db.collection('comentarios').insertMany([
            { peliculaId: 1, texto: 'Buena historia' },
            { peliculaId: 1, texto: 'Gran fotografía' },
            { peliculaId: 2, texto: 'La recomiendo' },
        ]);
        const ranking = await movies.aggregate([
            { $lookup: { from: 'comentarios', localField: '_id', foreignField: 'peliculaId', as: 'comentarios' } },
            { $project: { _id: 0, titulo: 1, total: { $size: '$comentarios' } } },
            { $sort: { total: -1, titulo: 1 } },
        ]).toArray();
        assert.deepEqual(ranking, [
            { titulo: 'Horizonte', total: 2 },
            { titulo: 'La estación', total: 1 },
        ]);
        console.log('Ranking: Horizonte (2 comentarios), La estación (1 comentario).');
    } finally {
        try {
            await db.dropDatabase();
        } finally {
            await client.close();
        }
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
