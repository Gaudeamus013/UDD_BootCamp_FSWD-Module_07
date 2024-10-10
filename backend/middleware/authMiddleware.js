const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas privadas
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener el token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario del token y agregarlo a la solicitud
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ mensaje: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};

// Middleware para verificar si el usuario es administrador
const admin = (req, res, next) => {
  if (req.user && req.user.esAdmin) {
    next();
  } else {
    res.status(403).json({ mensaje: 'No autorizado como administrador' });
  }
};

module.exports = { protect, admin };