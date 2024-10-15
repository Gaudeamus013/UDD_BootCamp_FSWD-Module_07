// Importación de módulos necesarios
const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Crear un enrutador de Express
const router = express.Router();

// Rutas para productos
router.get('/', getProducts); // Ruta para obtener todos los productos
router.post('/', protect, admin, createProduct); // Ruta para crear un nuevo producto (solo admin)

module.exports = router;