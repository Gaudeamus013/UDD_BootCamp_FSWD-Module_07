// Importación de módulos necesarios
const express = require('express');
const { getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Crear un enrutador de Express
const router = express.Router();

// Ruta para obtener todos los usuarios (solo admin)
router.get('/', protect, admin, getUsers);

module.exports = router;