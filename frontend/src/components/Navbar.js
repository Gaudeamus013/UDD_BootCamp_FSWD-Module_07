import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useCart } from '../hooks/useContextHooks';

const Navbar = () => {
  const { authState, authDispatch } = useAuth();
  const { cartState } = useCart();

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Cruz & Valencia
        </Link>
        <div>
          {authState.isAuthenticated ? (
            <>
              <span className="text-white mr-4">Bienvenido, {authState.user?.name}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
              Iniciar sesión
            </Link>
          )}
          <Link to="/carrito" className="ml-4 text-white">
            Carrito ({cartState.items.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;