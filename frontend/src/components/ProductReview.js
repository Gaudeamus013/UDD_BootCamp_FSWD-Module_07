import React, { useState } from 'react';
import axios from 'axios';

const ProductReview = ({ productId }) => {
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const enviarResena = async () => {
    try {
      await axios.post(`/api/productos/${productId}/reseñas`, {
        calificacion,
        comentario,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMensaje('Reseña enviada correctamente');
    } catch (error) {
      setMensaje('Error al enviar la reseña');
    }
  };

  return (
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
  );
};

export default ProductReview;