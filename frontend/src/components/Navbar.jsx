import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { LanguageContext } from '../context/LanguageContext';

const Navbar = () => {
  // Obtener los elementos del carrito desde el contexto
  const { cartItems } = useContext(CartContext);
  // Obtener la función de traducción desde el contexto del idioma
  const { t } = useContext(LanguageContext);

  return (
    // Barra de navegación con un fondo gris oscuro
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Enlace a la página de inicio con el título de la tienda */}
        <Link to="/" className="text-2xl font-bold">
          {t('titulo')}
        </Link>
        <div>
          {/* Enlace al carrito de compras con el número de artículos */}
          <Link to="/carrito" className="mr-4">
            {t('carrito')} ({cartItems.length})
          </Link>
          {/* Enlace para iniciar sesión */}
          <Link to="/login">{t('iniciarSesion')}</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;