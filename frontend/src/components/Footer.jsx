import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      &copy; {new Date().getFullYear()} E-commerce. Todos los derechos reservados.
    </footer>
  );
};

export default Footer;
