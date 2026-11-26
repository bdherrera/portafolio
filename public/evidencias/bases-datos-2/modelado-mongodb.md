# Modelado de alojamientos y comentarios en MongoDB

Práctica complementaria con datos sintéticos.

## Arreglo embebido para servicios

El catálogo muestra los servicios junto con el alojamiento. Se guardan en el mismo documento porque son datos pequeños que se consultan y actualizan con la ficha.

```json
{ "_id": 2, "ciudad": "Bogotá", "precio": 70, "servicios": ["Wifi", "Cocina"] }
```

La consulta del laboratorio filtra por ciudad y por un valor del arreglo. El índice compuesto de ciudad y precio cubre la igualdad por ciudad y el orden por precio. El servidor todavía debe leer los documentos para comprobar el servicio.

## Referencias para comentarios

```json
{ "_id": 1, "titulo": "Horizonte" }
```

```json
{ "peliculaId": 1, "texto": "Buena historia" }
```

Los comentarios se escriben y paginan por separado. Una referencia por identificador evita que el documento de película crezca a medida que llegan comentarios. El laboratorio usa `$lookup` para reunirlos y contar cuántos hay por película. En un catálogo grande, un índice sobre `comentarios.peliculaId` ayuda a buscar los comentarios de una película.

Si la ficha solo muestra las últimas tres reseñas, una variante del patrón *Subset* es guardar ese resumen en la película y mantener el historial en la colección de comentarios. Esa variante añade una escritura y requiere mantener sincronizado el resumen.
