const Order = require('../models/Order');

// Obtener historial de pedidos del usuario
exports.obtenerHistorialPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find({ usuario: req.user.id }).populate('productos.producto', 'nombre precio');
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el historial de pedidos', error: error.message });
  }
};
