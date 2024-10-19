const mongoose = require('mongoose');

const suscripcionSchema = new mongoose.Schema({
  suscriptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipoSuscripcion: {
    type: String,
    enum: ['basico', 'premium', 'vip'],
    required: true
  },
  fechaInicio: {
    type: Date,
    default: Date.now
  },
  fechaFin: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['activa', 'cancelada', 'expirada'],
    default: 'activa'
  }
});

module.exports = mongoose.model('Suscripcion', suscripcionSchema);