import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, PawPrint } from 'lucide-react';
import NotificationIndicator from './NotificationIndicator';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <PawPrint className="h-8 w-8 text-blue-500" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
                <Link to="/signup" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Registrarse</Link>
                <Link to="/login" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Iniciar Sesión</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/notifications" className="p-1 rounded-full text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <NotificationIndicator />
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
            <Link to="/signup" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Registrarse</Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">Iniciar Sesión</Link>
            <Link to="/notifications" className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
              <div className="flex items-center">
                <span>Notificaciones</span>
                <NotificationIndicator />
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;