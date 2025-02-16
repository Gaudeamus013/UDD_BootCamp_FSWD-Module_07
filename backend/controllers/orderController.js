const Order = require('../models/Order');
const paypal = require('../utils/paypal');

// @desc    Crear orden y generar pago PayPal
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice
    });

    const createdOrder = await order.save();

    // Crear la orden en PayPal usando el nuevo SDK
    const payment = await paypal.createPayment({
      total: totalPrice,
      currency: 'USD',
      orderId: createdOrder._id.toString()
    });

    res.status(201).json({ order: createdOrder, payment });
  } catch (error) {
    next(error);
  }
};

// @desc    Ejecutar (capturar) el pago de PayPal
// @route   POST /api/orders/:orderId/execute
// @access  Private
exports.executePayment = async (req, res, next) => {
  const { orderID } = req.body;  // Se espera recibir el ID de la orden de PayPal
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const paymentResult = await paypal.executePayment(orderID);
    if (paymentResult.status === "COMPLETED") {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = paymentResult;
      await order.save();
      res.json({ order });
    } else {
      res.status(400).json({ message: 'Payment not approved' });
    }
  } catch (error) {
    next(error);
  }
};
