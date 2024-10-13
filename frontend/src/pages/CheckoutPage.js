import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const response = await axiosInstance.get('/api/carrito');
        setCarrito(response.data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    obtenerCarrito();
  }, []);

  const procesarPedido = async () => {
    try {
      await axiosInstance.post('/api/pedidos', { productos: carrito });
      setMensaje('Pedido procesado exitosamente');
      navigate('/historial-pedidos');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      setMensaje('Error al procesar el pedido');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}
      {carrito.length === 0 ? (
        <p>El carrito está vacío. Añade productos antes de continuar con el pago.</p>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Productos en tu pedido:</h2>
          <ul>
            {carrito.map((producto) => (
              <li key={producto._id} className="mb-2">
                {producto.nombre} - ${producto.precio} x {producto.cantidad}
              </li>
            ))}
          </ul>
          <button onClick={procesarPedido} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Procesar Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;