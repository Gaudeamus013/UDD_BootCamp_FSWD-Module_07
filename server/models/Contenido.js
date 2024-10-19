const mongoose = require('mongoose');

const contenidoSchema = new mongoose.Schema({
  // ... (campos existentes)
  limiteVistas: {
    type: Number,
    default: 5
  },
  vistas: {
    type: Map,
    of: Number,
    default: {}
  }
});

module.exports = mongoose.model('Contenido', contenidoSchema);