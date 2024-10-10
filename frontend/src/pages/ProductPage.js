import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductReview from '../components/ProductReview';
import ProductSuggestions from '../components/ProductSuggestions';

const ProductPage = () => {
  const { id } = useParams();
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

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Helmet>
        <title>{producto.nombre} - Cruz & Valencia</title>
        <meta name="description" content={`Detalles del producto: ${producto.nombre} en Cruz & Valencia. ${producto.descripcion}`} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-96 object-cover mb-4" />
      <p className="text-xl mb-4">Precio: ${producto.precio}</p>
      <p className="mb-4">{producto.descripcion}</p>
      <ProductReview productId={id} />
      <ProductSuggestions currentProductId={id} />
    </div>
  );
};

export default ProductPage;