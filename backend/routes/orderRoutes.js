const express = require('express');
const { obtenerHistorialPedidos } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener el historial de pedidos del usuario
router.get('/historial', protect, obtenerHistorialPedidos);

module.exports = router;