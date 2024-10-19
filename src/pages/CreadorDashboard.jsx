import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Notificaciones from '../components/Notificaciones';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CreadorDashboard = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [suscriptores, setSuscriptores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [estadisticasRes, suscriptoresRes] = await Promise.all([
          axios.get('/api/analisis/estadisticas', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/suscripciones/mis-suscriptores', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setEstadisticas(estadisticasRes.data);
        setSuscriptores(suscriptoresRes.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Suscriptores', 'Contenido', 'Ingresos'],
    datasets: [
      {
        label: 'Estadísticas',
        data: estadisticas ? [estadisticas.suscriptoresActivos, estadisticas.contenidoPublicado, estadisticas.ingresosTotales] : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard del Creador</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {estadisticas && (
          <>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Suscriptores Activos</h2>
              <p className="text-3xl">{estadisticas.suscriptoresActivos}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Contenido Publicado</h2>
              <p className="text-3xl">{estadisticas.contenidoPublicado}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Ingresos Totales</h2>
              <p className="text-3xl">${estadisticas.ingresosTotales}</p>
            </div>
          </>
        )}
        <div className="md:col-span-3">
          <Notificaciones />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
        <div className="bg-white p-4 rounded shadow">
          <Bar data={chartData} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Suscriptores Recientes</h2>
        <div className="bg-white p-4 rounded shadow">
          <ul>
            {suscriptores.slice(0, 5).map((suscriptor) => (
              <li key={suscriptor._id} className="mb-2">
                {suscriptor.suscriptor.nombre} - {new Date(suscriptor.fechaInicio).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreadorDashboard;