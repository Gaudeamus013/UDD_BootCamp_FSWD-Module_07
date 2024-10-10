import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const response = await axios.get('/api/carrito');
        setCarrito(response.data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    obtenerCarrito();
  }, []);

  const actualizarCantidad = async (productoId, cantidad) => {
    try {
      await axios.put(`/api/carrito/${productoId}`, { cantidad });
      setMensaje('Cantidad actualizada correctamente');
      const response = await axios.get('/api/carrito');
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
      setMensaje('Error al actualizar la cantidad');
    }
  };

  const eliminarProducto = async (productoId) => {
    try {
      await axios.delete(`/api/carrito/${productoId}`);
      setMensaje('Producto eliminado del carrito');
      const response = await axios.get('/api/carrito');
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setMensaje('Error al eliminar el producto');
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}
      {carrito.length === 0 ? (
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
              {carrito.map((producto) => (
                <tr key={producto._id}>
                  <td className="py-2 px-4 border-b">{producto.nombre}</td>
                  <td className="py-2 px-4 border-b">${producto.precio}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => actualizarCantidad(producto._id, e.target.value)}
                      className="w-16 p-1 border rounded"
                      min="1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">${producto.precio * producto.cantidad}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => eliminarProducto(producto._id)}
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