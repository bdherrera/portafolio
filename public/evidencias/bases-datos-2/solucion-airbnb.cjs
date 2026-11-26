// Node.js con el paquete mongodb. Solo usa una base desechable en localhost.
const { MongoClient, Decimal128 } = require('mongodb');
const { randomUUID } = require('node:crypto');
const assert = require('node:assert/strict');

const decimal = (value) => Decimal128.fromString(String(value));
const projection = (...fields) => Object.fromEntries([['_id', 0], ...fields.map((field) => [field, 1])]);
const evidence = [];
function record(point, logic, total, sample) {
    evidence.push({ point, logic, total, sample });
}

async function run(db) {
    const listings = db.collection('listingsAndReviews');
    const first = 'taller-cabin';
    const second = 'taller-santiago';
    const sample = [
        ['Luxury Río', 'Brazil', 'Rio', 'House', 72.5, ['Wifi', 'Heating', 'Cable TV']],
        ['Casa Madrid', 'Spain', 'Madrid', 'House', 110, ['Wifi', 'Cable TV']],
        ['Suite Nueva York', 'United States', 'New York', 'Apartment', 305, Array.from({ length: 20 }, (_, i) => 'Servicio ' + i)],
        ['Condominio Barcelona', 'Spain', 'Barcelona', 'Condominium', 99, ['Heating', 'Kitchen']],
        ['Apartamento São Paulo', 'Brazil', 'São Paulo', 'Apartment', 55, ['Wifi', 'Kitchen']],
        ['Penthouse', 'United States', 'New York', 'Condominium', 1250, ['Wifi', 'Heating']],
    ];
    await listings.insertMany(sample.map(([name, country, market, property_type, price, amenities], i) => ({
        name, address: { country, market }, property_type, price: decimal(price), amenities,
        beds: i + 2, accommodates: i + 3, number_of_reviews: i * 6,
        summary: 'Datos de práctica', description: 'Alojamiento sintético',
        review_scores: { review_scores_rating: 80 + i },
        ...(i === 0 ? {} : { last_review: i === 1 ? null : new Date(Date.UTC(2019 + i % 3, 4, 1)) }),
    })));

    async function find(point, logic, filter, fields, sort = { _id: 1 }, limit = 0) {
        const result = await listings.find(filter, { projection: fields }).sort(sort).limit(limit || 5).toArray();
        record(point, logic, await listings.countDocuments(filter), result);
    }
    async function aggregate(point, logic, pipeline) {
        const result = await listings.aggregate(pipeline).toArray();
        record(point, logic, result.length, result.slice(0, 5));
        return result;
    }
    async function update(point, logic, operation, filter) {
        const result = await operation;
        record(point, logic, result.matchedCount, {
            modificados: result.modifiedCount, insertados: result.upsertedCount,
            documentos: await listings.find(filter).limit(3).toArray(),
        });
        return result;
    }

    const cabin = { _id: first, name: 'Cozy Cabin Retreat', summary: 'Cabaña de práctica', property_type: 'Cabin', price: decimal(150) };
    const santiago = { _id: second, name: 'Apartamento Santiago', address: { country: 'Chile', market: 'Santiago' } };
    const inserts = [
        [cabin],
        [santiago],
        [{ name: 'Studio de Arte Urbano', price: decimal(80) }, { name: 'Loft Minimalista', price: decimal(110) }],
        [{ name: 'Casa equipada', amenities: ['Wifi', 'Kitchen', 'Free parking'] }],
    ];
    for (const [i, documents] of inserts.entries()) {
        const result = i < 2 ? await listings.insertOne(documents[0]) : await listings.insertMany(documents);
        record(i + 1, ['Inserción individual con precio Decimal128.', 'Objeto address embebido.', 'Dos documentos en una operación.', 'Arreglo con tres servicios.'][i],
            i < 2 ? Number(result.acknowledged) : result.insertedCount, documents);
    }
    await assert.rejects(listings.insertOne({ _id: first, name: 'Duplicado' }), (error) => {
        assert.equal(error.code, 11000);
        record(5, 'El índice único de _id rechaza la segunda inserción.', 0, { codigo: error.code, error: 'E11000 duplicate key' });
        return true;
    });
    await find(6, 'Ruta de un campo anidado.', { 'address.country': 'Brazil' }, projection('name', 'price'));
    await find(7, 'Comparación estricta por cantidad de camas.', { beds: { $gt: 5 } }, projection('name', 'number_of_reviews'));
    await find(8, 'Precio estrictamente menor que 75.', { price: { $lt: decimal(75) } }, projection('name', 'price', 'property_type'));
    await find(9, 'Ambas condiciones deben cumplirse.', { $and: [{ property_type: 'Apartment' }, { 'address.market': 'New York' }] }, projection('name', 'property_type', 'address.market'));
    await find(10, '$in acepta cualquiera de los tipos indicados.', { property_type: { $in: ['House', 'Condominium'] } }, projection('name', 'property_type'));
    await find(11, 'Expresión regular con límites de palabra y opción i.', { name: /\bLuxury\b/i }, projection('name'));
    await find(12, 'Igualdad contra un elemento del arreglo.', { amenities: 'Heating' }, projection('name', 'amenities'));
    await find(13, '$size exige exactamente 20 elementos.', { amenities: { $size: 20 } }, projection('name', 'amenities'));
    await find(14, 'Orden descendente y desempate por _id. Solo precios numéricos.', { price: { $type: 'number' } }, projection('name', 'price', 'address.country'), { price: -1, _id: 1 }, 10);
    await find(15, 'Igualdad con null incluye el campo ausente.', { last_review: null }, projection('name', 'summary', 'description'), { number_of_reviews: -1, _id: 1 });
    const cabinFilter = { _id: first };
    const chileFilter = { _id: second };
    const spain = { 'address.country': 'Spain' };
    assert.equal((await update(16, '$set reemplaza una propiedad de la cabaña.', listings.updateOne(cabinFilter, { $set: { property_type: 'Entire home/apt' } }), cabinFilter)).modifiedCount, 1);
    assert.equal((await update(17, '$set agrega el resumen y $push crea el arreglo si falta.', listings.updateOne(chileFilter, { $set: { summary: 'Alojamiento actualizado' }, $push: { amenities: 'Smart TV' } }), chileFilter)).modifiedCount, 1);
    assert.equal((await update(18, '$inc modifica los alojamientos de España.', listings.updateMany(spain, { $inc: { number_of_reviews: 1 } }), spain)).modifiedCount, 2);
    const cableFilter = { amenities: 'Cable TV' };
    const cableIds = (await listings.find(cableFilter, { projection: { _id: 1 } }).toArray()).map(({ _id }) => _id);
    assert.equal((await update(19, '$pull elimina Cable TV conservando los demás servicios.', listings.updateMany(cableFilter, { $pull: { amenities: 'Cable TV' } }), { _id: { $in: cableIds } })).modifiedCount, 2);
    const mansion = { name: 'Mansión de Prueba' };
    assert.equal((await update(20, 'El upsert crea el documento si no existe.', listings.updateOne(mansion, { $set: { price: decimal(1500), 'address.country': 'United States' } }, { upsert: true }), mansion)).upsertedCount, 1);

    assert.equal((await aggregate(21, 'La posición 10 existe solo cuando hay más de 10 servicios.', [{ $match: { 'amenities.10': { $exists: true } } }, { $count: 'alojamientos' }]))[0].alojamientos, 1);
    await aggregate(22, 'Promedia solo precios numéricos de países identificados.', [{ $match: { price: { $type: 'number' }, 'address.country': { $type: 'string' } } }, { $group: { _id: '$address.country', promedio: { $avg: '$price' } } }, { $sort: { _id: 1 } }]);
    await aggregate(23, 'Cada aparición de un servicio cuenta una vez por elemento del arreglo.', [{ $unwind: '$amenities' }, { $group: { _id: '$amenities', frecuencia: { $sum: 1 } } }, { $sort: { frecuencia: -1, _id: 1 } }, { $limit: 5 }]);
    await aggregate(24, 'Excluye los documentos sin tipo de propiedad.', [{ $match: { property_type: { $type: 'string' } } }, { $group: { _id: '$property_type', cantidad: { $sum: 1 } } }, { $sort: { cantidad: -1, _id: 1 } }]);
    await aggregate(25, '$toInt trunca decimales. Se omiten precios ausentes y fuera de int32.', [{ $match: { price: { $type: 'number', $gte: decimal(0), $lte: decimal(2147483647) } } }, { $project: { ...projection('name', 'price'), price_entero: { $toInt: '$price' } } }, { $sort: { name: 1 } }]);
    await aggregate(26, 'El promedio usa solo calificaciones numéricas con diez reseñas o más.', [{ $match: { number_of_reviews: { $gte: 10 }, 'review_scores.review_scores_rating': { $type: 'number' } } }, { $group: { _id: null, promedio: { $avg: '$review_scores.review_scores_rating' } } }]);
    await aggregate(27, 'Intervalos continuos [0,101), [101,301), [301,1000) y [1000,+∞). El punto 1000 pertenece al último rango.', [{ $match: { price: { $type: 'number', $gte: decimal(0) } } }, { $bucket: { groupBy: '$price', boundaries: [0, 101, 301, 1000].map(decimal), default: '1000+', output: { cantidad: { $sum: 1 } } } }]);
    await db.collection('hosts').insertOne({ host_id: 'h1', name: 'Anfitrión de prueba' });
    await listings.updateOne(cabinFilter, { $set: { 'host.host_id': 'h1' } });
    const joined = await aggregate(28, 'El ejercicio es teórico en Atlas. Se demuestra con una colección hosts sintética de igual tipo de clave.', [{ $match: { 'host.host_id': { $exists: true } } }, { $lookup: { from: 'hosts', localField: 'host.host_id', foreignField: 'host_id', as: 'anfitriones' } }, { $project: projection('name', 'anfitriones') }]);
    assert.equal(joined[0].anfitriones[0].host_id, 'h1');
    await aggregate(29, 'Promedia capacidad numérica por tipo de propiedad.', [{ $match: { property_type: { $type: 'string' }, accommodates: { $type: 'number' } } }, { $group: { _id: '$property_type', promedio: { $avg: '$accommodates' } } }, { $sort: { promedio: -1, _id: 1 } }]);
    await aggregate(30, '$year se aplica solo a valores BSON de tipo fecha.', [{ $match: { last_review: { $type: 'date' } } }, { $group: { _id: { $year: '$last_review' }, cantidad: { $sum: 1 } } }, { $sort: { _id: 1 } }]);
}

async function main() {
    const client = new MongoClient('mongodb://127.0.0.1:' + (process.env.BD2_MONGO_PORT || '27017'), { serverSelectionTimeoutMS: 5000 });
    const db = client.db('bd2_airbnb_' + randomUUID().replaceAll('-', ''));
    try {
        await client.connect();
        await run(db);
        assert.equal(evidence.length, 30);
        console.log(JSON.stringify({ entorno: 'MongoDB local, datos sintéticos con estructura de sample_airbnb', ejercicios: evidence }, null, 2));
    } finally {
        if (evidence.length) {
            try { await db.dropDatabase(); } finally { await client.close(); }
        } else {
            await client.close();
        }
    }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
