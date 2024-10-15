import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  // Obtener la función de traducción desde el contexto del idioma
  const { t } = useContext(LanguageContext);

  return (
    // Pie de página con un fondo gris oscuro y texto blanco
    <footer className="bg-gray-800 p-4 text-white mt-10">
      <div className="container mx-auto text-center">
        {/* Mensaje de derechos reservados traducido */}
        <p>{t('derechosReservados')} &copy; 2024 Cruz y Valencia</p>
      </div>
    </footer>
  );
};

export default Footer;