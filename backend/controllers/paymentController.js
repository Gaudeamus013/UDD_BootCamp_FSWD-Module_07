const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');
const mercadopago = require('mercadopago');

// Configuración de Mercado Pago
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

// Stripe Payment
exports.crearPagoStripe = async (req, res) => {
  const { productos, tokenId } = req.body;

  try {
    const total = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: 'usd',
      source: tokenId,
      description: 'Pago por productos de Cruz & Valencia',
    });
    res.status(200).json({ mensaje: 'Pago exitoso', charge });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar el pago', error: error.message });
  }
};
