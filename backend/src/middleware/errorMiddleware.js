// Middleware para manejar errores de forma global
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Mostrar la pila de errores solo en desarrollo
    });
  };
  
  module.exports = { errorHandler };
  