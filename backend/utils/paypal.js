const paypal = require('@paypal/checkout-server-sdk');

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (process.env.PAYPAL_MODE === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

// Función para crear una orden (pago)
exports.createPayment = async (options) => {
  const { total, currency, orderId } = options;
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      reference_id: orderId,
      amount: {
        currency_code: currency,
        value: total.toFixed(2)
      },
      description: `Payment for order ${orderId}`
    }],
    application_context: {
      return_url: `http://yourfrontend.com/execute-payment?orderId=${orderId}`,
      cancel_url: `http://yourfrontend.com/cancel`
    }
  });

  try {
    const response = await client().execute(request);
    return response.result;
  } catch (err) {
    throw err;
  }
};

// Función para capturar la orden (ejecutar el pago)
exports.executePayment = async (orderID) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const response = await client().execute(request);
    return response.result;
  } catch (err) {
    throw err;
  }
};
