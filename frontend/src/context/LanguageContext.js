import React, { createContext, useState } from 'react';
import translations from '../i18n';

// Crear contexto para el idioma
export const LanguageContext = createContext();

// Proveedor del contexto del idioma
export const LanguageProvider = ({ children }) => {
  // Estado para el idioma actual
  const [language, setLanguage] = useState('es');

  // Función para traducir una clave según el idioma actual
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};