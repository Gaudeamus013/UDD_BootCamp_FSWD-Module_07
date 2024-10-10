import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductSuggestions = ({ currentProductId }) => {
  const [productosSugeridos, setProductosSugeridos] = useState([]);

  useEffect(() => {
    const obtenerSugerencias = async () => {
      try {
        const response = await axios.get(`/api/productos/${currentProductId}/sugerencias`);
        setProductosSugeridos(response.data);
      } catch (error) {
        console.error('Error al obtener sugerencias de productos:', error);
      }
    };

    obtenerSugerencias();
  }, [currentProductId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Productos Sugeridos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productosSugeridos.map((producto) => (
          <ProductCard key={producto._id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
