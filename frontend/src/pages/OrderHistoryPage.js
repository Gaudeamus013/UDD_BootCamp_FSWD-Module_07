import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptors';

const OrderHistoryPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await axiosInstance.get('/api/pedidos');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de pedidos:', error);
        setError('Error al obtener el historial de pedidos. Intenta nuevamente.');
      }
    };

    obtenerPedidos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Historial de Pedidos</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {pedidos.length === 0 ? (
        <p>No has realizado pedidos aún.</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido._id} className="mb-4">
              <div className="p-4 border rounded">
                <h2 className="text-xl font-bold">Pedido #{pedido._id}</h2>
                <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
                <p>Estado: {pedido.estado}</p>
                <h3 className="font-bold mt-2">Productos:</h3>
                <ul>
                  {pedido.productos.map((producto) => (
                    <li key={producto.productoId}>
                      {producto.nombre} - Cantidad: {producto.cantidad}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;