const express = require('express');
const { crearPagoStripe } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para realizar un pago con Stripe
router.post('/stripe', protect, crearPagoStripe);

module.exports = router;