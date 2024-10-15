import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    // Tarjeta de producto con borde, relleno y sombra
    <div className="border p-4 rounded shadow-md">
      {/* Imagen del producto */}
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      {/* Nombre del producto */}
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      {/* Precio del producto */}
      <p className="mt-2">${product.price}</p>
      {/* Enlace para ver los detalles del producto */}
      <Link
        to={`/productos/${product._id}`}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 block text-center"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default ProductCard;
