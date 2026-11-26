"""Práctica local con Python y SQLite. Ejecutar con Python 3."""

import csv
import sqlite3
from contextlib import closing
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory


SOURCE = """pedido_id,producto,unidades
101,Cuaderno,2
102,Lapiz,5
103,Cuaderno,3
102,Lapiz,5
104,Borrador,-1
"""


def orders(connection):
    return connection.execute(
        "SELECT id, producto, unidades FROM pedidos ORDER BY id"
    ).fetchall()


def main():
    with TemporaryDirectory(prefix="bd2-") as folder, closing(
        sqlite3.connect(Path(folder) / "pedidos.db")
    ) as primary, closing(sqlite3.connect(Path(folder) / "respaldo.db")) as backup:
        primary.execute("PRAGMA journal_mode = WAL").fetchone()
        primary.execute(
            "CREATE TABLE pedidos (id INTEGER PRIMARY KEY, producto TEXT NOT NULL, "
            "unidades INTEGER NOT NULL CHECK (unidades > 0))"
        )
        with primary:
            for row in csv.DictReader(StringIO(SOURCE)):
                units = int(row["unidades"])
                if units <= 0:
                    continue
                primary.execute(
                    "INSERT INTO pedidos VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING",
                    (int(row["pedido_id"]), row["producto"], units),
                )

        expected = [(101, "Cuaderno", 2), (102, "Lapiz", 5), (103, "Cuaderno", 3)]
        assert orders(primary) == expected
        print("Integración CSV a SQLite: 5 filas de origen, 3 válidas y únicas, 10 unidades.")

        with closing(sqlite3.connect(Path(folder) / "pedidos.db")) as reader:
            primary.execute("BEGIN IMMEDIATE")
            primary.execute("UPDATE pedidos SET unidades = 9 WHERE id = 101")
            before_commit = orders(reader)[0][2]
            primary.commit()
            after_commit = orders(reader)[0][2]
            assert (before_commit, after_commit) == (2, 9)
            print(f"Lectura concurrente en modo WAL: {before_commit} antes del COMMIT, {after_commit} después.")

        snapshot = orders(primary)
        primary.backup(backup)
        with primary:
            primary.execute("DELETE FROM pedidos WHERE id = 103")
        assert len(orders(primary)) == 2

        with closing(sqlite3.connect(Path(folder) / "restaurada.db")) as restored:
            backup.backup(restored)
            integrity = restored.execute("PRAGMA integrity_check").fetchone()[0]
            assert integrity == "ok" and orders(restored) == snapshot
            print("Recuperación: 2 pedidos tras el borrado, 3 tras restaurar. Integridad: ok.")


if __name__ == "__main__":
    main()
