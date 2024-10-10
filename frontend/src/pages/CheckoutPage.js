import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarCheckout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/pedidos', {
        nombre,
        direccion,
        metodoPago,
      });
      setMensaje('Pedido realizado correctamente');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      setMensaje('Error al realizar el pedido');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Finalizar Compra</h1>
      {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}
      <form onSubmit={manejarCheckout}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Dirección de Envío</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Método de Pago</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un método de pago</option>
            <option value="tarjeta">Tarjeta de Crédito/Débito</option>
            <option value="paypal">PayPal</option>
            <option value="webpay">WebPay</option>
            <option value="mercadopago">Mercado Pago</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Realizar Pedido
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;