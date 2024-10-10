import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Cruz & Valencia
        </Link>
        <div>
          <Link to="/productos" className="text-white mr-4">
            Productos
          </Link>
          <Link to="/carrito" className="text-white mr-4">
            Carrito
          </Link>
          <Link to="/login" className="text-white">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;