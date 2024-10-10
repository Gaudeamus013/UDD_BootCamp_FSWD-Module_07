import React, { useEffect } from 'react';
import { useCart } from '../hooks/useContextHooks';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartState, cartDispatch } = useCart();

  useEffect(() => {
    // Ejemplo de lógica para cargar el carrito desde el backend si es necesario
    const cargarCarrito = async () => {
      try {
        // Aquí iría la llamada al backend para obtener los productos del carrito
        const carritoDesdeBackend = []; // Suponiendo que obtuviste los productos del backend
        carritoDesdeBackend.forEach(item => {
          cartDispatch({ type: 'ADD_TO_CART', payload: item });
        });
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };

    cargarCarrito();
  }, [cartDispatch]);

  const actualizarCantidad = (productoId, cantidad) => {
    cartDispatch({ type: 'UPDATE_CART_ITEM', payload: { id: productoId, quantity: cantidad } });
  };

  const eliminarProducto = (productoId) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: productoId });
  };

  const calcularTotal = () => {
    return cartState.items.reduce((total, producto) => total + producto.precio * producto.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      {cartState.items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Producto</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Cantidad</th>
                <th className="py-2">Total</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartState.items.map((producto) => (
                <tr key={producto.id}>
                  <td className="py-2 px-4 border-b">{producto.nombre}</td>
                  <td className="py-2 px-4 border-b">${producto.precio}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={producto.quantity}
                      onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value, 10))}
                      className="w-16 p-1 border rounded"
                      min="1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">${producto.precio * producto.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total: ${calcularTotal()}</h2>
            <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;