const express = require('express');
const router = express.Router();
const Mensaje = require('../models/Mensaje');
const auth = require('../middleware/auth');

// Enviar un mensaje
router.post('/', auth, async (req, res) => {
  try {
    const { receptorId, contenido } = req.body;
    const nuevoMensaje = new Mensaje({
      emisor: req.usuario.id,
      receptor: receptorId,
      contenido
    });

    await nuevoMensaje.save();
    res.json(nuevoMensaje);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener mensajes de una conversación
router.get('/conversacion/:usuarioId', auth, async (req, res) => {
  try {
    const mensajes = await Mensaje.find({
      $or: [
        { emisor: req.usuario.id, receptor: req.params.usuarioId },
        { emisor: req.params.usuarioId, receptor: req.usuario.id }
      ]
    }).sort({ fechaEnvio: 1 });

    res.json(mensajes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Marcar mensaje como leído
router.put('/leer/:id', auth, async (req, res) => {
  try {
    const mensaje = await Mensaje.findById(req.params.id);

    if (!mensaje) {
      return res.status(404).json({ msg: 'Mensaje no encontrado' });
    }

    if (mensaje.receptor.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    mensaje.leido = true;
    await mensaje.save();

    res.json(mensaje);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;