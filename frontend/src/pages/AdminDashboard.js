import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useContextHooks';
import axios from 'axios';
import InventoryManagement from '../components/InventoryManagement';

const AdminDashboard = () => {
  const { authState } = useAuth();
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    if (authState.isAuthenticated && authState.user?.role === 'admin') {
      obtenerProductos();
    }
  }, [authState]);

  const actualizarInventario = async (productoId, stock) => {
    try {
      await axios.put(`/api/productos/${productoId}`, { stock });
      setMensaje('Inventario actualizado correctamente');
      // Refrescar la lista de productos
      const response = await axios.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al actualizar el inventario:', error);
      setMensaje('Error al actualizar el inventario');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}
      <InventoryManagement productos={productos} actualizarInventario={actualizarInventario} />
    </div>
  );
};

export default AdminDashboard;