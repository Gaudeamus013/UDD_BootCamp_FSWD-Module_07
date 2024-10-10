import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import es from './i18n/es.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React ya realiza el escape de los valores por defecto
    },
  });

export default i18n;