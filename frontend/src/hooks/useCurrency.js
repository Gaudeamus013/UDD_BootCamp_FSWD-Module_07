import { useState, useEffect } from 'react';

// Hook personalizado para manejar la conversión de monedas
const useCurrency = (initialCurrency = 'USD', initialRate = 1) => {
  // Estado para la moneda actual y la tasa de conversión
  const [currency, setCurrency] = useState(initialCurrency);
  const [rate, setRate] = useState(initialRate);

  // useEffect para simular la obtención de la tasa de conversión
  useEffect(() => {
    const fetchRate = async () => {
      try {
        // Simular una llamada a una API para obtener la tasa de conversión
        const simulatedRate = currency === 'USD' ? 1 : 0.85; // Ejemplo: tasa para EUR
        setRate(simulatedRate);
      } catch (error) {
        console.error('Error obteniendo la tasa de conversión', error);
      }
    };

    fetchRate();
  }, [currency]);

  return [currency, rate, setCurrency];
};

export default useCurrency;