import os
import pandas as pd
import json
from decimal import Decimal
import mysql.connector

ruta_actual = os.path.dirname(os.path.abspath(__file__))

conexion = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='nwind'
)

# Realizar la consulta
consulta = "SELECT p.ProductID Clave, p.ProductName Producto, c.CategoryName Categoria, p.UnitsInStock Existencia , p.ReorderLevel 'Nivel de Reorden' FROM products p JOIN categories c ON p.CategoryID = c.CategoryID;"
cursor = conexion.cursor()
cursor.execute(consulta)
resultados = cursor.fetchall()

columnas = [i[0] for i in cursor.description]
df = pd.DataFrame(resultados, columns=columnas)

nombre_archivo_json = os.path.join(ruta_actual, 'resultados.json')


def decimal_to_string(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError(
        f'Object of type {obj.__class__.__name__} is not JSON serializable')


resultados_json = df.to_dict(orient='records')
resultados_json = json.dumps(resultados_json, default=decimal_to_string)

with open(nombre_archivo_json, 'w') as archivo:
    archivo.write(resultados_json)

conexion.close()
