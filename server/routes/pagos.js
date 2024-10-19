const express = require('express');
const router = express.Router();
const Pago = require('../models/Pago');
const Contenido = require('../models/Contenido');
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Procesar pago
router.post('/', auth, async (req, res) => {
  try {
    const { contenidoId, token } = req.body;
    const contenido = await Contenido.findById(contenidoId);
    if (!contenido) {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
    }

    const charge = await stripe.charges.create({
      amount: contenido.precio * 100, // Stripe usa centavos
      currency: 'usd',
      source: token,
      description: `Pago por ${contenido.titulo}`
    });

    const nuevoPago = new Pago({
      usuario: req.usuario.id,
      contenido: contenidoId,
      monto: contenido.precio,
      metodoPago: 'stripe',
      estado: 'completado'
    });

    await nuevoPago.save();
    res.json({ msg: 'Pago procesado con éxito', pago: nuevoPago });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Obtener historial de pagos del usuario
router.get('/historial', auth, async (req, res) => {
  try {
    const pagos = await Pago.find({ usuario: req.usuario.id })
      .populate('contenido', 'titulo')
      .sort({ createdAt: -1 });
    res.json(pagos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;