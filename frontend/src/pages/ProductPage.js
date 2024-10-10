import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useContextHooks';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import ProductReview from '../components/ProductReview';
import ProductSuggestions from '../components/ProductSuggestions';
import Spinner from '../components/Spinner';

const ProductPage = () => {
  const { id } = useParams();
  const { cartDispatch } = useCart();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`/api/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { id: producto.id, nombre: producto.nombre, precio: producto.precio, quantity: 1 } });
  };

  if (!producto) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>{`Cruz & Valencia - ${producto.nombre}`}</title>
        <meta name="description" content={producto.descripcion} />
        <meta name="keywords" content={`perfume, ${producto.nombre}, Cruz & Valencia, perfumes exclusivos`} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-96 object-cover mb-4" />
      <p className="text-xl mb-4">Precio: ${producto.precio}</p>
      <p className="mb-4">{producto.descripcion}</p>
      <button onClick={agregarAlCarrito} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Agregar al Carrito
      </button>
      <Suspense fallback={<div className="flex justify-center items-center"><Spinner /></div>}>
        <ProductReview productId={id} />
        <ProductSuggestions currentProductId={id} />
      </Suspense>
    </div>
  );
};

export default ProductPage;