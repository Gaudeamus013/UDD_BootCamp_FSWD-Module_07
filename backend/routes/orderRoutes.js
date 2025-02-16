const express = require('express');
const router = express.Router();
const { createOrder, executePayment } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createOrder);
router.post('/:orderId/execute', protect, executePayment);

module.exports = router;
