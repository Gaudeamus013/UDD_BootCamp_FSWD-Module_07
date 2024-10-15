// Importaciones necesarias
const User = require('../models/User');

// Controlador para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

module.exports = { getUsers };