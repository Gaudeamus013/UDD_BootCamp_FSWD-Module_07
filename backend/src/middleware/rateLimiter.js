// Importación del módulo express-rate-limit para limitar el número de peticiones
const rateLimit = require('express-rate-limit');

// Configuración del limitador de peticiones
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de tiempo de 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message: 'Demasiadas peticiones desde esta IP, por favor inténtelo de nuevo después de 15 minutos',
});

module.exports = { limiter };