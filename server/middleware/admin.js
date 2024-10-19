const Usuario = require('../models/Usuario');

module.exports = async function(req, res, next) {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (usuario.tipoUsuario !== 'admin') {
      return res.status(403).json({ msg: 'Acceso denegado. Se requieren permisos de administrador.' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};