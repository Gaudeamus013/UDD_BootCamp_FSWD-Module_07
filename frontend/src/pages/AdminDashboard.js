import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import InventoryManagement from '../components/InventoryManagement';

const AdminDashboard = () => {
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

    obtenerProductos();
  }, []);

  const actualizarInventario = async (productoId) => {
    try {
      await axios.put(`/api/productos/${productoId}`, { stock: 10 }); // Ejemplo de actualización de stock
      setMensaje('Inventario actualizado correctamente');
      const response = await axios.get('/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al actualizar el inventario:', error);
      setMensaje('Error al actualizar el inventario');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Panel de Administración - Cruz & Valencia</title>
        <meta name="description" content="Panel de administración para gestionar productos, pedidos y usuarios en Cruz & Valencia." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}
      <InventoryManagement productos={productos} actualizarInventario={actualizarInventario} />
    </div>
  );
};

export default AdminDashboard;