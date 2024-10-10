import React from 'react';

const InventoryManagement = ({ productos, actualizarInventario }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Inventario</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Producto</th>
            <th className="py-2">Stock</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td className="py-2 px-4 border-b">{producto.nombre}</td>
              <td className="py-2 px-4 border-b">{producto.stock}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => actualizarInventario(producto._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Actualizar Stock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;