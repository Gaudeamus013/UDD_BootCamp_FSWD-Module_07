const express = require('express');
const router = express.Router();
const Suscripcion = require('../models/Suscripcion');
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');

// Crear una nueva suscripción
router.post('/', auth, async (req, res) => {
  try {
    const { creadorId, tipoSuscripcion } = req.body;
    const suscriptor = req.usuario.id;

    // Verificar si ya existe una suscripción activa
    const suscripcionExistente = await Suscripcion.findOne({
      suscriptor,
      creador: creadorId,
      estado: 'activa'
    });

    if (suscripcionExistente) {
      return res.status(400).json({ msg: 'Ya tienes una suscripción activa con este creador' });
    }

    // Calcular la fecha de fin (1 mes desde ahora)
    const fechaFin = new Date();
    fechaFin.setMonth(fechaFin.getMonth() + 1);

    const nuevaSuscripcion = new Suscripcion({
      suscriptor,
      creador: creadorId,
      tipoSuscripcion,
      fechaFin
    });

    await nuevaSuscripcion.save();

    res.json(nuevaSuscripcion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener todas las suscripciones de un usuario
router.get('/mis-suscripciones', auth, async (req, res) => {
  try {
    const suscripciones = await Suscripcion.find({ suscriptor: req.usuario.id })
      .populate('creador', 'nombre')
      .sort({ fechaInicio: -1 });
    res.json(suscripciones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener todos los suscriptores de un creador
router.get('/mis-suscriptores', auth, async (req, res) => {
  try {
    const suscripciones = await Suscripcion.find({ creador: req.usuario.id, estado: 'activa' })
      .populate('suscriptor', 'nombre email')
      .sort({ fechaInicio: -1 });
    res.json(suscripciones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Cancelar una suscripción
router.put('/cancelar/:id', auth, async (req, res) => {
  try {
    const suscripcion = await Suscripcion.findById(req.params.id);

    if (!suscripcion) {
      return res.status(404).json({ msg: 'Suscripción no encontrada' });
    }

    if (suscripcion.suscriptor.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    suscripcion.estado = 'cancelada';
    await suscripcion.save();

    res.json({ msg: 'Suscripción cancelada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;