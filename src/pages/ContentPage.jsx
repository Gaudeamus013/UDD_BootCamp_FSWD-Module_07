import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentViewer from '../components/ContentViewer';

const ContentPage = () => {
  // ... (código existente)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/contenido/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContent(response.data);
      } catch (error) {
        console.error('Error al obtener el contenido:', error);
        if (error.response && error.response.status === 403) {
          alert(error.response.data.msg);
        }
      }
    };

    fetchContent();
  }, [id]);

  // ... (resto del código)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (código existente) */}
      {content && (
        <p className="text-gray-600 mb-4">
          Visualizaciones restantes: {content.limiteVistas - (content.vistas.get(localStorage.getItem('userId')) || 0)}
        </p>
      )}
      {/* ... (resto del código) */}
    </div>
  );
};

export default ContentPage;