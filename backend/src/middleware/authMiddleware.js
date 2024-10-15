// Importación de módulos necesarios
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas (requiere autenticación)
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener el token de la cabecera de autorización
      token = req.headers.authorization.split(' ')[1];
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Obtener el usuario del token, excluyendo la contraseña
      req.user = await User.findById(decoded.id).select('-password');
      next(); // Continuar con la siguiente función del middleware
    } catch (error) {
      res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'No autorizado, no se proporcionó un token' });
  }
};

// Middleware para proteger rutas de administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Continuar si el usuario tiene el rol de administrador
  } else {
    res.status(403).json({ message: 'No autorizado como administrador' });
  }
};

module.exports = { protect, admin };
