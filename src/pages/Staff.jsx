import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Staff = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({ nombreUsuario: '', nombre: '', apellido: '', email: '', password: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await api.get('/usuarios/lista');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const crearAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/crear-admin', nuevoAdmin);
      setNuevoAdmin({ nombreUsuario: '', nombre: '', apellido: '', email: '', password: '' });
      cargarUsuarios();
    } catch (error) {
      console.error('Error al crear administrador:', error);
    }
  };

  const actualizarUsuario = async (id, tipoUsuario) => {
    try {
      await api.put(`/usuarios/actualizar/${id}`, { tipoUsuario });
      cargarUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await api.delete(`/usuarios/eliminar/${id}`);
      cargarUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      {user && user.tipoUsuario === 'superadmin' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Crear Nuevo Administrador</h2>
          <form onSubmit={crearAdmin} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={nuevoAdmin.nombreUsuario}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, nombreUsuario: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoAdmin.nombre}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, nombre: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={nuevoAdmin.apellido}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, apellido: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={nuevoAdmin.email}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={nuevoAdmin.password}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear Administrador</button>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Nombre de Usuario</th>
              <th className="text-left">Nombre</th>
              <th className="text-left">Email</th>
              <th className="text-left">Tipo de Usuario</th>
              <th className="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.nombre} {usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.tipoUsuario}</td>
                <td>
                  {user && user.tipoUsuario === 'superadmin' && usuario.tipoUsuario !== 'superadmin' && (
                    <select
                      value={usuario.tipoUsuario}
                      onChange={(e) => actualizarUsuario(usuario._id, e.target.value)}
                      className="mr-2"
                    >
                      <option value="suscriptor">Suscriptor</option>
                      <option value="creador">Creador</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}
                  <button
                    onClick={() => eliminarUsuario(usuario._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;