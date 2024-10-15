// Importación de módulos necesarios
const jwt = require('jsonwebtoken');

// Función para generar un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expira en 30 días
  });
};

module.exports = { generateToken };