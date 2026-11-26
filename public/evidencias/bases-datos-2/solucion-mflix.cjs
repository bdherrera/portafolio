// Node.js con el paquete mongodb. Solo usa una base desechable en localhost.
const { MongoClient } = require('mongodb');
const { randomUUID } = require('node:crypto');
const assert = require('node:assert/strict');
const { runModels } = require('./modelos-taller-mflix.cjs');

async function run(db) {
    const movies = db.collection('movies');
    const comments = db.collection('comments');
    const { insertedIds } = await movies.insertMany([
        { title: 'The Quiet Man', year: 2005, genres: ['Drama', 'Comedy', 'Romance'], imdb: { rating: 8.7 }, cast: ['Tom Hanks'], directors: ['Jane Doe'], rated: 'PG' },
        { title: 'A Winter Story', year: 2009, genres: ['Drama'], imdb: { rating: 8.9 }, cast: ['Tom Hanks'], directors: ['Steven Spielberg'] },
        { title: 'Fiesta', year: 2015, genres: ['Comedy'], imdb: { rating: 8.1 }, rated: 'NOT RATED' },
        { title: 'Puente', year: 2015, genres: ['Drama'], imdb: { rating: 6.6 }, rated: 'PG' },
        { title: 'Vuelta', year: 2015, genres: ['Comedy'], imdb: { rating: 5.2 }, rated: 'UNRATED' },
        { title: 'Mar', year: 2015, genres: ['Drama'], imdb: { rating: '' }, rated: 'PG' },
    ]);
    await movies.insertMany(Array.from({ length: 550 }, (_, i) => ({
        title: 'Drama histórico ' + i, year: 1950 + i % 50, genres: ['Drama'], rated: 'PG',
        imdb: { rating: 6 + (i % 25) / 10 }, directors: ['Dirección ' + i % 10],
    })));
    await movies.insertMany(Array.from({ length: 5500 }, (_, i) => ({
        title: 'Ficción ' + i, year: 1950 + i % 50, genres: ['Fantasy'],
        rated: 'PG', imdb: { rating: i % 2 === 0 ? 6.2 : '' },
    })));
    await comments.insertMany(Array.from({ length: 260 }, (_, i) => ({
        movie_id: insertedIds[i % 2], email: 'lectora@example.test', date: new Date(Date.UTC(2025, 0, i + 1)),
    })));

    const exercises = [];
    const record = (point, logic, total, result) => exercises.push({ point, logic, total, result });
    const byDrama = { genres: 'Drama', year: { $gte: 2000, $lte: 2010 }, 'imdb.rating': { $gte: 8 } };
    const dramaProjection = { _id: 0, title: 1, year: 1, 'imdb.rating': 1 };
    const drama = () => movies.find(byDrama, { projection: dramaProjection }).sort({ 'imdb.rating': -1 }).limit(10);
    const dramas = await drama().toArray();
    assert.equal(dramas.length, 2);
    record(1, 'Filtra género, año y rating. Ordena por rating y separa el conteo total del límite de diez.', await movies.countDocuments(byDrama), dramas);

    async function find(point, logic, filter) {
        const first = await movies.find(filter, { projection: { _id: 0, title: 1, year: 1 } }).sort({ title: 1 }).limit(5).toArray();
        record(point, logic, await movies.countDocuments(filter), first);
    }
    async function aggregate(point, logic, collection, pipeline) {
        const result = await collection.aggregate(pipeline).toArray();
        record(point, logic, result.length, result.slice(0, 5));
        return result;
    }
    await find(2, '$ne excluye a Spielberg incluso si comparte dirección.', { cast: 'Tom Hanks', directors: { $ne: 'Steven Spielberg' } });
    await find(3, '$all exige ambos géneros y $size fija el largo del arreglo.', { genres: { $all: ['Comedy', 'Romance'], $size: 3 } });
    await find(4, 'Se distinguen campo ausente y valores literales permitidos.', { $or: [{ rated: { $exists: false } }, { rated: { $in: ['UNRATED', 'NOT RATED'] } }] });
    await find(5, 'Los anclajes de la expresión regular marcan inicio y fin.', { title: /^The.*Man$/i });
    const genres = await aggregate(6, 'Filtra ratings numéricos antes de descomponer géneros y conserva grupos con más de 500 películas.', movies, [
        { $match: { 'imdb.rating': { $type: 'number' } } }, { $unwind: '$genres' },
        { $group: { _id: '$genres', cantidad: { $sum: 1 }, promedio: { $avg: '$imdb.rating' }, maximo: { $max: '$imdb.rating' } } },
        { $match: { cantidad: { $gt: 500 } } }, { $set: { promedio: { $round: ['$promedio', 2] } } }, { $sort: { promedio: -1, _id: 1 } },
    ]);
    assert.equal(genres.find((item) => item._id === 'Drama').cantidad, 553);
    await aggregate(7, 'Cuenta películas de rating alto por director. $firstN acota los títulos guardados por grupo.', movies, [
        { $match: { 'imdb.rating': { $gte: 7.5 } } }, { $unwind: '$directors' }, { $sort: { title: 1, _id: 1 } },
        { $group: { _id: '$directors', cantidad: { $sum: 1 }, titulos: { $firstN: { input: '$title', n: 3 } } } },
        { $match: { cantidad: { $gte: 5 } } }, { $sort: { cantidad: -1, _id: 1 } }, { $limit: 5 },
    ]);
    await aggregate(8, 'Trunca el año numérico a múltiplos de diez.', movies, [
        { $match: { year: { $gte: 1950 } } },
        { $group: { _id: { $subtract: ['$year', { $mod: ['$year', 10] }] }, cantidad: { $sum: 1 } } }, { $sort: { _id: 1 } },
    ]);
    const ranking = await aggregate(9, 'Agrupa comentarios, verifica la referencia a movies y limita a los diez primeros.', comments, [
        { $group: { _id: '$movie_id', comentarios: { $sum: 1 } } },
        { $lookup: { from: 'movies', localField: '_id', foreignField: '_id', as: 'pelicula' } }, { $unwind: '$pelicula' },
        { $sort: { comentarios: -1, _id: 1 } }, { $limit: 10 },
        { $project: { _id: 0, title: '$pelicula.title', year: '$pelicula.year', comentarios: 1 } },
    ]);
    assert.equal(ranking[0].comentarios, 130);
    await aggregate(10, 'Agrupa por email y toma los extremos cronológicos con fecha BSON.', comments, [
        { $match: { email: { $type: 'string' }, date: { $type: 'date' } } },
        { $group: { _id: '$email', cantidad: { $sum: 1 }, primero: { $min: '$date' }, ultimo: { $max: '$date' } } },
        { $match: { cantidad: { $gt: 250 } } }, { $sort: { cantidad: -1, _id: 1 } },
    ]);

    const output = db.collection('peliculas_pareja');
    await movies.aggregate([
        { $match: { year: 2015 } },
        { $project: { title: 1, genres: 1, rating: { $convert: { input: '$imdb.rating', to: 'double', onError: null, onNull: null } } } },
        { $set: { categoria: { $switch: { branches: [
            { case: { $gte: ['$rating', 7.5] }, then: 'Alta' },
            { case: { $gte: ['$rating', 6] }, then: 'Media' },
        ], default: 'Baja' } } } },
        { $out: 'peliculas_pareja' },
    ]).toArray();
    record(11, '$switch aplica los umbrales en orden. Un rating ausente o inválido queda en Baja. $out materializa la colección.', await output.countDocuments(), await output.find({}, { projection: { _id: 0 } }).sort({ title: 1 }).toArray());
    const updated = await output.updateMany({ categoria: 'Media' }, { $set: { revisado: true }, $inc: { rating: 0.1 } });
    assert.equal(updated.modifiedCount, 1);
    record(12, 'Marca e incrementa solo las películas de categoría Media.', updated.matchedCount, { modificados: updated.modifiedCount, muestra: await output.findOne({ categoria: 'Media' }, { projection: { _id: 0 } }) });
    const removed = await output.deleteMany({ categoria: 'Baja' });
    assert.equal(removed.deletedCount, 2);
    record(13, 'Borra los documentos materializados de categoría Baja.', removed.deletedCount, { restantes: await output.countDocuments() });

    const summarize = (explain) => ({
        plan: explain.queryPlanner.winningPlan,
        totalDocsExamined: explain.executionStats.totalDocsExamined,
        executionTimeMillis: explain.executionStats.executionTimeMillis,
        nReturned: explain.executionStats.nReturned,
    });
    const before = summarize(await drama().explain('executionStats'));
    const index = await movies.createIndex({ genres: 1, 'imdb.rating': -1, year: 1 }, { name: 'genero_rating_anio_esr' });
    try {
        const after = summarize(await drama().explain('executionStats'));
        assert.match(JSON.stringify(before.plan), /COLLSCAN/);
        assert.match(JSON.stringify(after.plan), /IXSCAN/);
        assert.equal(after.nReturned, before.nReturned);
        assert.ok(after.totalDocsExamined < before.totalDocsExamined);
        record(14, 'El índice coloca género (igualdad), rating (orden) y año (rango). Se compara el plan ganador sin hint; el tiempo depende del conjunto y del equipo.', after.nReturned, { before, after });
    } finally {
        await movies.dropIndex(index);
    }

    exercises.push(...await runModels(db));
    return exercises;
}

async function main() {
    const client = new MongoClient('mongodb://127.0.0.1:' + (process.env.BD2_MONGO_PORT || '27017'), { serverSelectionTimeoutMS: 5000 });
    const db = client.db('bd2_mflix_' + randomUUID().replaceAll('-', ''));
    await client.connect();
    try {
        const exercises = await run(db);
        assert.equal(exercises.length, 17);
        console.log(JSON.stringify({ entorno: 'MongoDB local, datos sintéticos con estructura de sample_mflix', ejercicios: exercises }, null, 2));
    } finally {
        try { await db.dropDatabase(); } finally { await client.close(); }
    }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
