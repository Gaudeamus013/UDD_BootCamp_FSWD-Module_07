import { useState, useEffect } from 'react';

// Hook personalizado para sincronizar un valor con localStorage
const useLocalStorage = (key, initialValue) => {
  // Estado para el valor almacenado
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Intentar obtener el valor almacenado en localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error leyendo desde localStorage', error);
      return initialValue;
    }
  });

  // useEffect para actualizar localStorage cuando cambia el valor almacenado
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error escribiendo en localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;