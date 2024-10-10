// ProductReview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/productos/${productId}/reviews`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        setError('Hubo un problema al cargar las reseñas. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const enviarResena = async () => {
    try {
      await axios.post(
        `/api/productos/${productId}/reseñas`,
        {
          calificacion,
          comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMensaje('Reseña enviada correctamente');
      setCalificacion(0);
      setComentario('');
      // Refrescar las reseñas después de enviar una nueva
      const response = await axios.get(`/api/productos/${productId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      setMensaje('Error al enviar la reseña');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="reviews">
      <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
      {reviews.length === 0 ? (
        <p>No hay reseñas para este producto.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-2">
              <p className="font-semibold">{review.autor}:</p>
              <p>{review.comentario}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Dejar una Reseña</h2>
        <div className="flex items-center mb-4">
          <label className="mr-2">Calificación:</label>
          <input
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            className="w-20 p-1 border rounded"
            min="0"
            max="5"
          />
        </div>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Escribe tu comentario aquí..."
        ></textarea>
        <button
          onClick={enviarResena}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar Reseña
        </button>
        {mensaje && <p className="mt-2">{mensaje}</p>}
      </div>
    </div>
  );
};

export default ProductReview;
