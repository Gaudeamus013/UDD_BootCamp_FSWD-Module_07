import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistoryPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/pedidos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        setMensaje('Error al obtener el historial de pedidos');
      }
    };

    obtenerPedidos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Historial de Pedidos</h1>
      {mensaje && <p className="mb-4 text-red-500">{mensaje}</p>}
      {pedidos.length === 0 ? (
        <p>No tienes pedidos realizados.</p>
      ) : (
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">ID del Pedido</th>
                <th className="py-2">Fecha</th>
                <th className="py-2">Total</th>
                <th className="py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido._id}>
                  <td className="py-2 px-4 border-b">{pedido._id}</td>
                  <td className="py-2 px-4 border-b">{new Date(pedido.fecha).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">${pedido.total}</td>
                  <td className="py-2 px-4 border-b">{pedido.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;