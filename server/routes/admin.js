const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Contenido = require('../models/Contenido');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Obtener todos los usuarios (solo admin)
router.get('/usuarios', [auth, admin], async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar usuario (solo admin)
router.delete('/usuarios/:id', [auth, admin], async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    await usuario.remove();
    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.status(500).send('Error del servidor');
  }
});

// Obtener todo el contenido (solo admin)
router.get('/contenido', [auth, admin], async (req, res) => {
  try {
    const contenido = await Contenido.find().populate('creador', 'nombre');
    res.json(contenido);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar contenido (solo admin)
router.delete('/contenido/:id', [auth, admin], async (req, res) => {
  try {
    const contenido = await Contenido.findById(req.params.id);
    if (!contenido) {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
    }
    await contenido.remove();
    res.json({ msg: 'Contenido eliminado' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
    }
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;