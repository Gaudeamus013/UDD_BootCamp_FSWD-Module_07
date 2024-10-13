import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosInterceptors';

const InventoryPage = React.memo(() => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const obtenerProductos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('Error al obtener los productos. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  const actualizarProducto = async (id, actualizado) => {
    try {
      const response = await axiosInstance.put(`/api/productos/${id}`, actualizado);
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto._id === id ? { ...producto, ...response.data } : producto
        )
      );
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestión de Inventario</h1>
      {isLoading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p className="mb-4 text-red-500">{error}</p>
      ) : productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto._id} className="mb-4">
              <div className="p-4 border rounded">
                <h2 className="text-xl font-bold">{producto.nombre}</h2>
                <p>Precio: ${producto.precio}</p>
                <input
                  type="number"
                  value={producto.precio}
                  onChange={(e) => actualizarProducto(producto._id, { precio: e.target.value })}
                  className="w-20 p-1 border rounded mb-2"
                />
                <p>Stock: {producto.stock}</p>
                <input
                  type="number"
                  value={producto.stock}
                  onChange={(e) => actualizarProducto(producto._id, { stock: e.target.value })}
                  className="w-20 p-1 border rounded mb-2"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default InventoryPage;