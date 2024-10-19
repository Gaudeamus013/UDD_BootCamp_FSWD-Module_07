const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { nombreUsuario, password } = req.body;
    let usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const payload = {
      usuario: {
        id: usuario.id,
        tipoUsuario: usuario.tipoUsuario
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener perfil de usuario
router.get('/perfil', auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// ... (resto del código)

module.exports = router;