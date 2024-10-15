import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  // Obtener la función para eliminar del carrito desde el contexto
  const { removeFromCart } = useContext(CartContext);

  return (
    // Elemento del carrito con borde inferior y espaciado
    <div className="flex items-center justify-between border-b py-4">
      <div>
        {/* Nombre del producto y cantidad */}
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p>${item.price} x {item.qty}</p>
      </div>
      {/* Botón para eliminar el producto del carrito */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;