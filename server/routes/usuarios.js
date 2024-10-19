const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, password, tipoUsuario } = req.body;
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }
    
    // Evitar que se registren usuarios como administradores
    const userType = tipoUsuario === 'creador' ? 'creador' : 'suscriptor';
    
    usuario = new Usuario({
      nombre,
      email,
      password,
      tipoUsuario: userType
    });
    await usuario.save();
    const payload = {
      usuario: {
        id: usuario.id
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

// ... (resto del código sin cambios)

module.exports = router;