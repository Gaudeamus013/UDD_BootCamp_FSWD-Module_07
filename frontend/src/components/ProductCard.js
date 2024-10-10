import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
      <p className="text-gray-700 mb-2">${producto.precio}</p>
      <Link to={`/productos/${producto._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
        Ver Detalles
      </Link>
    </div>
  );
};

export default ProductCard;