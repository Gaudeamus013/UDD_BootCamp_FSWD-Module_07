import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageSelector = () => {
  // Obtener la función para cambiar el idioma y el idioma actual desde el contexto
  const { setLanguage, language } = useContext(LanguageContext);

  return (
    // Selector de idioma con botones para cambiar el idioma
    <div className="flex items-center space-x-4">
      {/* Botón para cambiar a Español */}
      <button
        onClick={() => setLanguage('es')}
        className={language === 'es' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Español
      </button>
      {/* Botón para cambiar a Inglés */}
      <button
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        English
      </button>
      {/* Botón para cambiar a Francés */}
      <button
        onClick={() => setLanguage('fr')}
        className={language === 'fr' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Français
      </button>
      {/* Botón para cambiar a Alemán */}
      <button
        onClick={() => setLanguage('de')}
        className={language === 'de' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Deutsch
      </button>
      {/* Botón para cambiar a Italiano */}
      <button
        onClick={() => setLanguage('it')}
        className={language === 'it' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Italiano
      </button>
      {/* Botón para cambiar a Portugués */}
      <button
        onClick={() => setLanguage('pt')}
        className={language === 'pt' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Português
      </button>
      {/* Botón para cambiar a Catalán */}
      <button
        onClick={() => setLanguage('ca')}
        className={language === 'ca' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Català
      </button>
      {/* Botón para cambiar a Gallego */}
      <button
        onClick={() => setLanguage('gl')}
        className={language === 'gl' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Galego
      </button>
      {/* Botón para cambiar a Euskera */}
      <button
        onClick={() => setLanguage('eu')}
        className={language === 'eu' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Euskara
      </button>
      {/* Botón para cambiar a Mapuche */}
      <button
        onClick={() => setLanguage('arn')}
        className={language === 'arn' ? 'font-bold' : ''} // Resaltar si está seleccionado
      >
        Mapudungun
      </button>
    </div>
  );
};

export default LanguageSelector;