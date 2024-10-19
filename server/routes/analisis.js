const express = require('express');
const router = express.Router();
const Contenido = require('../models/Contenido');
const Suscripcion = require('../models/Suscripcion');
const auth = require('../middleware/auth');

// Obtener estadísticas básicas para creadores
router.get('/estadisticas', auth, async (req, res) => {
  try {
    const creadorId = req.usuario.id;

    // Contar suscriptores activos
    const suscriptoresActivos = await Suscripcion.countDocuments({
      creador: creadorId,
      estado: 'activa'
    });

    // Contar contenido publicado
    const contenidoPublicado = await Contenido.countDocuments({ creador: creadorId });

    // Calcular ingresos totales (simplificado, sin considerar comisiones o impuestos)
    const suscripciones = await Suscripcion.find({ creador: creadorId, estado: 'activa' });
    const ingresosTotales = suscripciones.reduce((total, suscripcion) => {
      // Aquí deberías tener una lógica más compleja para calcular el precio según el tipo de suscripción
      const precioMensual = suscripcion.tipoSuscripcion === 'vip' ? 20 : suscripcion.tipoSuscripcion === 'premium' ? 10 : 5;
      return total + precioMensual;
    }, 0);

    res.json({
      suscriptoresActivos,
      contenidoPublicado,
      ingresosTotales
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;