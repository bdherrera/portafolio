-- Práctica complementaria del Quiz 2. Requiere las tablas y datos del script del quiz.
-- Las dos consultas son de solo lectura.

-- 1. Repaso: unir el pedido a sus líneas y totalizar por sucursal.
SELECT p.id_sucursal,
       COUNT(DISTINCT p.id_pedido) AS pedidos,
       SUM(d.cantidad) AS unidades
FROM pedido p
JOIN detalle_pedido d ON d.id_pedido = p.id_pedido
GROUP BY p.id_sucursal
ORDER BY p.id_sucursal;

-- 2. SQL avanzado: seleccionar los tres puestos con más unidades por categoría.
-- DENSE_RANK conserva los empates. Una categoría puede devolver más de tres productos.
WITH totales AS (
    SELECT pr.id_categoria, d.id_producto, SUM(d.cantidad) AS unidades
    FROM detalle_pedido d
    JOIN producto pr ON pr.id_producto = d.id_producto
    GROUP BY pr.id_categoria, d.id_producto
), ranking AS (
    SELECT id_categoria, id_producto, unidades,
           DENSE_RANK() OVER (PARTITION BY id_categoria ORDER BY unidades DESC) AS puesto
    FROM totales
)
SELECT id_categoria, id_producto, unidades, puesto
FROM ranking
WHERE puesto <= 3
ORDER BY id_categoria, puesto, id_producto;
