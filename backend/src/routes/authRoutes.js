// Importación de módulos necesarios
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Crear un enrutador de Express
const router = express.Router();

// Rutas para registro e inicio de sesión
router.post('/register', registerUser); // Ruta para registrar un nuevo usuario
router.post('/login', loginUser); // Ruta para iniciar sesión

module.exports = router;
