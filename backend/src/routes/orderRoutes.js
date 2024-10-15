// Importación de módulos necesarios
const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Crear un enrutador de Express
const router = express.Router();

// Rutas para pedidos
router.post('/', protect, createOrder); // Ruta para crear un nuevo pedido (usuario autenticado)

module.exports = router;