import { ArrowDown, ArrowRight } from 'lucide-react';

const relationalModels = {
    quiz: {
        title: 'Modelo relacional del Quiz 2',
        relations: [
            ['CLIENTE', 'id_cliente', 'PEDIDO', 'id_cliente'],
            ['SUCURSAL', 'id_sucursal', 'PEDIDO', 'id_sucursal'],
            ['CATEGORIA', 'id_categoria', 'CATEGORIA', 'id_categoria_padre'],
            ['CATEGORIA', 'id_categoria', 'PRODUCTO', 'id_categoria'],
            ['PEDIDO', 'id_pedido', 'DETALLE_PEDIDO', 'id_pedido'],
            ['PRODUCTO', 'id_producto', 'DETALLE_PEDIDO', 'id_producto'],
            ['DETALLE_PEDIDO', '(id_pedido, num_linea)', 'DEVOLUCION', '(id_pedido, num_linea)'],
        ],
        note: 'DETALLE_PEDIDO vincula pedidos y productos. Su clave compuesta identifica la línea exacta a la que corresponde una devolución. La relación de CATEGORIA consigo misma representa la jerarquía.',
    },
    mercaandes: {
        title: 'Modelo relacional de MercaAndes',
        relations: [
            ['CATEGORIA', 'id_categoria', 'CATEGORIA', 'id_padre'],
            ['CATEGORIA', 'id_categoria', 'PRODUCTO', 'id_categoria'],
            ['PRODUCTO', 'id_producto', 'INVENTARIO', 'id_producto'],
            ['BODEGA', 'id_bodega', 'INVENTARIO', 'id_bodega'],
            ['CLIENTE', 'id_cliente', 'PEDIDO', 'id_cliente'],
            ['PEDIDO', 'id_pedido', 'PEDIDO_DETALLE', 'id_pedido'],
            ['PRODUCTO', 'id_producto', 'PEDIDO_DETALLE', 'id_producto'],
            ['PEDIDO', 'id_pedido', 'PAGO', 'id_pedido'],
        ],
        note: 'INVENTARIO cruza productos y bodegas con la clave compuesta (id_producto, id_bodega). PEDIDO_DETALLE identifica cada línea con (id_pedido, linea). El diagrama muestra las tablas conectadas por claves foráneas.',
    },
};

export type DatabaseTwoModel = keyof typeof relationalModels | 'mongo';

function RelationshipArrow({ label }: { label: string }) {
    return (
        <span className="flex items-center justify-center gap-2 text-xs font-semibold text-accent-300 sm:flex-col">
            <span>{label}</span>
            <ArrowRight size={19} className="hidden sm:block" aria-hidden="true" />
            <ArrowDown size={19} className="sm:hidden" aria-hidden="true" />
        </span>
    );
}

function ModelNode({ name, children }: { name: string; children: React.ReactNode }) {
    return (
        <div className="min-w-0 rounded-lg border border-primary-500/30 bg-background/80">
            <div className="border-b border-primary-500/20 bg-primary-500/10 px-3 py-2 text-sm font-semibold text-primary-300 break-words">
                {name}
            </div>
            <div className="px-3 py-2 text-sm text-foreground/80 break-words">{children}</div>
        </div>
    );
}

export default function DatabaseTwoModels({ model }: { model: DatabaseTwoModel }) {
    if (model === 'mongo') {
        return (
            <details className="mt-5 rounded-xl border border-primary-500/25 px-4 py-3">
                <summary className="cursor-pointer font-semibold text-primary-300">Diagramas de los patrones de MongoDB</summary>
                <div className="mt-4 grid gap-5 lg:grid-cols-2">
                    <figure className="rounded-lg border border-primary-500/20 p-3">
                        <figcaption className="mb-3 font-semibold">Arreglo embebido de servicios</figcaption>
                        <ModelNode name="alojamientos">
                            <p><code>_id: 2 · ciudad: Bogotá · precio: 70</code></p>
                            <div className="mt-2 rounded-md border border-accent-500/35 bg-accent-500/10 p-2">
                                <code>servicios: [Wifi, Cocina]</code>
                            </div>
                        </ModelNode>
                        <p className="mt-3 text-sm text-foreground/75">Los servicios se consultan y actualizan junto con el alojamiento.</p>
                    </figure>
                    <figure className="rounded-lg border border-primary-500/20 p-3">
                        <figcaption className="mb-3 font-semibold">Referencia entre colecciones</figcaption>
                        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                            <ModelNode name="peliculas"><code>_id: 1<br />titulo: Horizonte</code></ModelNode>
                            <RelationshipArrow label="1 a N" />
                            <ModelNode name="comentarios"><code>peliculaId: 1<br />texto: Buena historia</code></ModelNode>
                        </div>
                        <p className="mt-3 text-sm text-foreground/75">
                            <code>$lookup</code> enlaza <code>peliculas._id</code> con <code>comentarios.peliculaId</code> para contar los comentarios por película.
                        </p>
                    </figure>
                </div>
            </details>
        );
    }

    const schema = relationalModels[model];
    return (
        <details className="mt-5 rounded-xl border border-primary-500/25 px-4 py-3">
            <summary className="cursor-pointer font-semibold text-primary-300">{schema.title}</summary>
            <figure className="mt-4">
                <figcaption className="mb-4 text-sm text-foreground/75">{schema.note}</figcaption>
                <p className="mb-3 text-xs text-foreground/75">PK = clave primaria · FK = clave foránea · 1 a N = uno a muchos</p>
                <ul className="space-y-3">
                    {schema.relations.map(([parent, pk, child, fk]) => (
                        <li key={child + '/' + fk} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]">
                            <ModelNode name={parent}><code>PK {pk}</code></ModelNode>
                            <RelationshipArrow label="1 a N" />
                            <ModelNode name={child}><code>FK {fk}</code></ModelNode>
                        </li>
                    ))}
                </ul>
            </figure>
        </details>
    );
}
