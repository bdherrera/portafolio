const assert = require('node:assert/strict');

async function runModels(db) {
    // 15. Domicilios.
    const restaurants = db.collection('restaurantes');
    const menus = db.collection('menus');
    const reviews = db.collection('resenas');
    const orders = db.collection('pedidos');
    await restaurants.insertOne({ _id: 'r1', ciudad: 'Bogotá', nombre: 'La Plaza', promedio: 4.8, totalResenas: 1, ultimas: [{ id: 'v1', nota: 4.8 }] });
    await menus.insertOne({ _id: 'm1', restauranteId: 'r1', nombre: 'Bowl', precio: 25000, atributos: [{ clave: 'vegano', valor: true }] });
    await reviews.insertOne({ _id: 'v1', restauranteId: 'r1', clienteId: 'c1', nota: 4.8, fecha: new Date('2026-11-03') });
    await orders.insertOne({ _id: 'o1', clienteId: 'c1', restauranteId: 'r1', repartidorId: 'd1', fecha: new Date('2026-11-10'), items: [{ menuId: 'm1', nombre: 'Bowl', precioUnitario: 24000, cantidad: 2 }], total: 48000 });
    await db.collection('clientes').insertOne({ _id: 'c1', nombre: 'Cliente de prueba' });
    await db.collection('repartidores').insertOne({ _id: 'd1', nombre: 'Repartidor de prueba' });
    await restaurants.createIndex({ ciudad: 1, promedio: -1, _id: 1 });
    await menus.createIndex({ restauranteId: 1, 'atributos.clave': 1, 'atributos.valor': 1 });
    await reviews.createIndex({ restauranteId: 1, fecha: -1 });
    await orders.createIndex({ clienteId: 1, fecha: -1 });
    const recentOrders = await orders.find({ clienteId: 'c1', fecha: { $gte: new Date('2026-10-25'), $lt: new Date('2026-11-25') } }, { projection: { fecha: 1, total: 1 } }).sort({ fecha: -1 }).toArray();
    const topRestaurants = await restaurants.find({ ciudad: 'Bogotá' }, { projection: { nombre: 1, promedio: 1 } }).sort({ promedio: -1, _id: 1 }).limit(5).toArray();
    assert.equal(recentOrders[0].total, 48000);
    assert.equal(topRestaurants[0].promedio, 4.8);

    // 16. Calidad del aire. Ventana UTC equivalente a un día en Bogotá.
    const sensors = db.collection('sensores');
    const buckets = db.collection('lecturas_por_hora');
    const alerts = db.collection('alertas');
    await sensors.insertMany([{ _id: 's1', localidad: 'Usaquén', version: 1 }, { _id: 's2', localidad: 'Usaquén', version: 2 }]);
    const hour = new Date('2026-11-24T13:00:00Z');
    await buckets.insertMany([
        { sensorId: 's1', localidad: 'Usaquén', hora: hour, schemaVersion: 1, sumaPm25: 65, n: 2, lecturas: [{ minuto: 0, pm25: 25, pm10: 35, temperatura: 16, humedad: 70 }, { minuto: 1, pm25: 40, pm10: 52, temperatura: 17, humedad: 69 }] },
        { sensorId: 's2', localidad: 'Usaquén', hora: hour, schemaVersion: 2, sumaPm25: 40, n: 1, lecturas: [{ minuto: 0, pm25: 40, pm10: 50, temperatura: 17, humedad: 68, co2: 610 }] },
    ]);
    await alerts.insertMany([{ sensorId: 's1', fecha: new Date('2026-11-24T13:01:00Z'), pm25: 40 }, { sensorId: 's2', fecha: hour, pm25: 40 }]);
    await buckets.createIndex({ sensorId: 1, hora: 1 }, { unique: true });
    await buckets.createIndex({ localidad: 1, hora: 1 });
    await alerts.createIndex({ fecha: -1, sensorId: 1 });
    const hourly = await buckets.aggregate([
        { $match: { localidad: 'Usaquén', hora: { $gte: new Date('2026-11-24T05:00:00Z'), $lt: new Date('2026-11-25T05:00:00Z') } } },
        { $group: { _id: '$hora', suma: { $sum: '$sumaPm25' }, n: { $sum: '$n' } } },
        { $project: { promedio: { $divide: ['$suma', '$n'] } } }, { $sort: { _id: 1 } },
    ]).toArray();
    const alerted = await alerts.aggregate([
        { $match: { fecha: { $gte: new Date('2026-11-18'), $lt: new Date('2026-11-25') }, pm25: { $gt: 37 } } },
        { $group: { _id: '$sensorId', alertas: { $sum: 1 } } }, { $sort: { _id: 1 } },
    ]).toArray();
    assert.equal(hourly[0].promedio, 35);
    assert.equal(alerted.length, 2);

    // 17. Red social universitaria.
    const profiles = db.collection('perfiles');
    const overflow = db.collection('seguidores_externos');
    const posts = db.collection('publicaciones');
    await profiles.insertMany([
        { _id: 'e1', sigue: ['u1', 'e2'], seguidores: [], outlier: false },
        { _id: 'u1', sigue: [], seguidores: [], outlier: true, cantidadSeguidores: 100001 },
        { _id: 'e2', sigue: [], seguidores: ['e1'], outlier: false },
    ]);
    await overflow.insertOne({ cuentaId: 'u1', seguidorId: 'e1' });
    const date = new Date('2026-11-24');
    await posts.insertMany([
        { _id: 'p1', autorId: 'u1', tipo: 'encuesta', opciones: ['Sí', 'No'], fecha: date, interacciones: 8, comentariosRecientes: [{ id: 'cmt1', texto: 'Interesante' }] },
        { _id: 'p2', autorId: 'e2', tipo: 'imagen', rutaImagen: '/foto.jpg', fecha: date, interacciones: 3, comentariosRecientes: [] },
        { _id: 'p3', autorId: 'u1', tipo: 'video', rutaVideo: '/video.mp4', fecha: date, interacciones: 2, comentariosRecientes: [] },
        { _id: 'p4', autorId: 'e1', tipo: 'texto', texto: 'Hola', fecha: date, interacciones: 0, comentariosRecientes: [] },
    ]);
    await db.collection('comentarios_publicacion').insertOne({ _id: 'cmt1', publicacionId: 'p1', autorId: 'e1', texto: 'Interesante', fecha: date });
    await overflow.createIndex({ cuentaId: 1, seguidorId: 1 }, { unique: true });
    await db.collection('comentarios_publicacion').createIndex({ publicacionId: 1, fecha: -1 });
    await posts.createIndex({ autorId: 1, fecha: -1, _id: 1 });
    await posts.createIndex({ fecha: -1, interacciones: -1 });
    const student = await profiles.findOne({ _id: 'e1' });
    const feed = await posts.find({ autorId: { $in: student.sigue } }).sort({ fecha: -1, _id: 1 }).limit(20).toArray();
    const engagement = await posts.find({ fecha: { $gte: new Date('2026-11-18'), $lt: new Date('2026-11-25') } }, { projection: { tipo: 1, interacciones: 1 } }).sort({ interacciones: -1, _id: 1 }).limit(10).toArray();
    assert.deepEqual(feed.map(({ _id }) => _id), ['p1', 'p2', 'p3']);
    assert.equal(engagement[0].interacciones, 8);

    async function examples(collections) {
        return Object.fromEntries(await Promise.all(collections.map(async (name) => [
            name, await db.collection(name).findOne(),
        ])));
    }

    return [
        { point: 15, logic: 'Fecha de compra fija para reproducibilidad. El pedido conserva el precio histórico y el ranking usa el promedio guardado.', result: { pedidos: recentOrders, restaurantes: topRestaurants },
            examples: await examples(['restaurantes', 'menus', 'resenas', 'pedidos', 'clientes', 'repartidores']) },
        { point: 16, logic: 'Promedio ponderado por cantidad de mediciones en cada bucket y sensores únicos con alertas sobre 37 µg/m³.', result: { promedioHorario: hourly, sensoresConAlertas: alerted },
            examples: await examples(['sensores', 'lecturas_por_hora', 'alertas']) },
        { point: 17, logic: 'Feed cronológico a partir de autores seguidos y ranking de la semana por interacciones precalculadas.', result: { feed, publicacionesDestacadas: engagement },
            examples: await examples(['perfiles', 'seguidores_externos', 'publicaciones', 'comentarios_publicacion']) },
    ];
}

module.exports = { runModels };
