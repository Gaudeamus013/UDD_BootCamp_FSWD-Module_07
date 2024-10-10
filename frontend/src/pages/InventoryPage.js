import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryPage = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  const actualizarStock = async (productoId, nuevoStock) => {
    try {
      await axios.put(`/api/productos/${productoId}`, { stock: nuevoStock });
      setMensaje('Stock actualizado correctamente');
      const response = await axios.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
      setMensaje('Error al actualizar el stock');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestión de Inventario</h1>
      {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Producto</th>
            <th className="py-2">Precio</th>
            <th className="py-2">Stock</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td className="py-2 px-4 border-b">{producto.nombre}</td>
              <td className="py-2 px-4 border-b">${producto.precio}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  value={producto.stock}
                  onChange={(e) => actualizarStock(producto._id, e.target.value)}
                  className="w-16 p-1 border rounded"
                  min="0"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => actualizarStock(producto._id, producto.stock)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Actualizar Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;