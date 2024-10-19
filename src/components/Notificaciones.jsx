import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Check, Trash2, X } from 'lucide-react';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const cargarNotificaciones = async () => {
    try {
      setCargando(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/notificaciones', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotificaciones(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
      setError('No se pudieron cargar las notificaciones. Por favor, intenta de nuevo más tarde.');
    } finally {
      setCargando(false);
    }
  };

  const marcarComoLeida = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/notificaciones/${id}/leer`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotificaciones(notificaciones.map(notif => 
        notif._id === id ? { ...notif, leida: true } : notif
      ));
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      alert('No se pudo marcar la notificación como leída. Por favor, intenta de nuevo.');
    }
  };

  const eliminarNotificacion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/notificaciones/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotificaciones(notificaciones.filter(notif => notif._id !== id));
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      alert('No se pudo eliminar la notificación. Por favor, intenta de nuevo.');
    }
  };

  const marcarTodasComoLeidas = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/notificaciones/leer-todas', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotificaciones(notificaciones.map(notif => ({ ...notif, leida: true })));
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      alert('No se pudieron marcar todas las notificaciones como leídas. Por favor, intenta de nuevo.');
    }
  };

  const toggleNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  };

  const notificacionesNoLeidas = notificaciones.filter(notif => !notif.leida).length;

  return (
    <div className="relative">
      <button
        onClick={toggleNotificaciones}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <Bell size={24} />
        {notificacionesNoLeidas > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notificacionesNoLeidas}
          </span>
        )}
      </button>

      {mostrarNotificaciones && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Notificaciones</h2>
              <button
                onClick={() => setMostrarNotificaciones(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {cargando ? (
              <div className="text-center py-4">Cargando notificaciones...</div>
            ) : error ? (
              <div className="text-red-500 p-4">{error}</div>
            ) : notificaciones.length === 0 ? (
              <p className="text-center py-4">No tienes notificaciones.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notificaciones.map((notificacion) => (
                  <li key={notificacion._id} className={`p-4 ${notificacion.leida ? 'bg-gray-50' : 'bg-blue-50'}`}>
                    <p className="text-sm">{notificacion.contenido}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(notificacion.fecha).toLocaleString()}</p>
                    <div className="mt-2 flex justify-end space-x-2">
                      {!notificacion.leida && (
                        <button 
                          onClick={() => marcarComoLeida(notificacion._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => eliminarNotificacion(notificacion._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {notificaciones.length > 0 && (
            <div className="p-4 border-t">
              <button 
                onClick={marcarTodasComoLeidas}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Marcar todas como leídas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;