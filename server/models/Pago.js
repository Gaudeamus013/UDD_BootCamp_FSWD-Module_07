const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  contenido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contenido',
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  metodoPago: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'completado', 'fallido'],
    default: 'pendiente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pago', pagoSchema);