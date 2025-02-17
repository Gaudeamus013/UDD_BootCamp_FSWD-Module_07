import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import api from '../services/api';

const Checkout = () => {
  const { state } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderItems = state.cart.map(item => ({
        product: item._id,
        quantity: item.quantity
      }));
      const { data } = await api.post('/orders', { orderItems, totalPrice });
      // Redirigir a la URL de aprobación de PayPal
      const approvalUrl = data.payment.links.find(link => link.rel === 'approve');
      if (approvalUrl) {
        window.location.href = approvalUrl.href;
      }
    } catch (error) {
      console.error('Error during checkout', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {state.cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="mb-4">
            {state.cart.map(item => (
              <li key={item._id} className="flex justify-between border-b py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white p-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Pagar con PayPal'}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
