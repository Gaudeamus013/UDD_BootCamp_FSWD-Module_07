import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const ProductSuggestions = ({ currentProductId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`/api/productos/${currentProductId}/sugerencias`);
        setSuggestions(response.data);
        setLoading(false);
      } catch (error) {
        setError('Hubo un problema al cargar las sugerencias. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentProductId]);

  const agregarASugerencias = async (productoId) => {
    try {
      await axios.post(
        `/api/productos/${productoId}/agregar-sugerencia`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuggestions((prevSuggestions) => [...prevSuggestions, { id: productoId, nombre: 'Nuevo Producto', precio: 0 }]);
    } catch (error) {
      setError('Error al agregar el producto a las sugerencias');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="suggestions">
      <h2 className="text-2xl font-bold mb-4">También te podría interesar</h2>
      {suggestions.length === 0 ? (
        <p>No hay sugerencias disponibles.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="p-4 border rounded">
              <h3 className="font-bold mb-2">{suggestion.nombre}</h3>
              <p>Precio: ${suggestion.precio}</p>
              <button
                onClick={() => agregarASugerencias(suggestion.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Agregar a sugerencias
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSuggestions;