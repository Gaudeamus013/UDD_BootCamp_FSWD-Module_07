import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Reemplaza con la clave de tu API de conversión de divisas
const CURRENCY_API_URL = 'https://openexchangerates.org/api/latest.json';

export const formatPrice = (price, currency = 'CLP') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(price);
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(`${CURRENCY_API_URL}?app_id=${API_KEY}`);
    const rates = response.data.rates;
    const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
    return formatPrice(convertedAmount, toCurrency);
  } catch (error) {
    console.error('Error al convertir moneda:', error);
    throw error;
  }
};

// Ejemplos de uso:
// formatPrice(100, 'USD'); // Formatea en dólares americanos
// formatPrice(100, 'CLP'); // Formatea en pesos chilenos
// formatPrice(100, 'BRL'); // Formatea en reales brasileños

// frontend/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProdutos = async () => {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw error;
  }
};

export const getProdutoById = async (id) => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar producto:', error);
    throw error;
  }
};

export const createPedido = async (pedidoData) => {
  try {
    const response = await api.post('/pedidos', pedidoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};