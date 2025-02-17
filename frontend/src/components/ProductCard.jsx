import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <Link to={`/products/${product._id}`} className="text-blue-500 hover:underline">
        Ver detalles
      </Link>
    </div>
  );
};

export default ProductCard;
