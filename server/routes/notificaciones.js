const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');
const auth = require('../middleware/auth');

// Obtener el conteo de notificaciones no leídas
router.get('/no-leidas', auth, async (req, res) => {
  try {
    const count = await Notificacion.countDocuments({ 
      usuario: req.usuario.id,
      leida: false
    });
    res.json({ count });
  } catch (err) {
    console.error('Error al obtener notificaciones no leídas:', err.message);
    res.status(500).json({ message: 'Error del servidor al obtener notificaciones' });
  }
});

// ... (resto del código)

module.exports = router;