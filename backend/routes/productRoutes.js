const express = require('express');
const {
  obtenerProductos,
  actualizarInventarioProducto,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', obtenerProductos);

// Ruta para actualizar el inventario de un producto
router.put('/:id/inventario', protect, admin, actualizarInventarioProducto);

module.exports = router;