import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useContextHooks';
import axiosInstance from '../utils/axiosInterceptors';
import { Helmet } from 'react-helmet';
import Spinner from '../components/Spinner';

const ProductReview = React.lazy(() => import('../components/ProductReview'));
const ProductSuggestions = React.lazy(() => import('../components/ProductSuggestions'));

const ProductPage = () => {
  const { id } = useParams();
  const { cartDispatch } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchProducto = async () => {
    try {
      const response = await axiosInstance.get(`/api/productos/${id}`);
      if (response.status === 200 && response.data) {
        setProducto(response.data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNotFound(true);
      } else {
        setError('Hubo un problema al cargar el producto. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    if (producto) {
      cartDispatch({ type: 'ADD_TO_CART', payload: { id: producto.id, nombre: producto.nombre, precio: producto.precio, quantity: 1 } });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (notFound) {
    return <div className="text-red-500 text-center p-4">El producto solicitado no fue encontrado.</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!producto) {
    return <div className="text-red-500 text-center p-4">Error inesperado: No se pudo cargar la información del producto.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>{`Cruz & Valencia - ${producto.nombre}`}</title>
        <meta name="description" content={producto.descripcion} />
        <meta name="keywords" content={`perfume, ${producto.nombre}, Cruz & Valencia, perfumes exclusivos`} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
      <img src={producto.imagen || '/ruta_a_imagen_predeterminada.jpg'} alt={producto.nombre} className="w-full h-96 object-cover mb-4" />
      <p className="text-xl mb-4">Precio: ${producto.precio}</p>
      <p className="mb-4">{producto.descripcion || 'Descripción no disponible.'}</p>
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