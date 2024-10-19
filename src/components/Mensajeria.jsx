import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

const Mensajeria = ({ usuarioId }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const socket = useContext(SocketContext);

  useEffect(() => {
    cargarMensajes();

    if (socket) {
      socket.on('nuevoMensaje', (mensaje) => {
        if (mensaje.emisor === usuarioId || mensaje.receptor === usuarioId) {
          setMensajes(prevMensajes => [...prevMensajes, mensaje]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('nuevoMensaje');
      }
    };
  }, [usuarioId, socket]);

  const cargarMensajes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/mensajes/conversacion/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensajes(response.data);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/mensajes', {
        receptorId: usuarioId,
        contenido: nuevoMensaje
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNuevoMensaje('');
      
      // Emitir el nuevo mensaje a través del socket
      if (socket) {
        socket.emit('enviarMensaje', response.data);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4 h-64 overflow-y-auto">
        {mensajes.map((mensaje) => (
          <div key={mensaje._id} className={`mb-2 ${mensaje.emisor === usuarioId ? 'text-left' : 'text-right'}`}>
            <span className={`inline-block p-2 rounded-lg ${mensaje.emisor === usuarioId ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
              {mensaje.contenido}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensaje}>
        <div className="flex items-center">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Mensajeria;