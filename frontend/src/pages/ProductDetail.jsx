import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { AppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useContext(AppContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="mt-4">{product.description}</p>
      <button onClick={handleAddToCart} className="mt-4 bg-green-500 text-white p-2 rounded">
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ProductDetail;
