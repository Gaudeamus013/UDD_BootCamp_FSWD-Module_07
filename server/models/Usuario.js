const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tipoUsuario: {
    type: String,
    enum: ['suscriptor', 'creador', 'admin'],
    default: 'suscriptor'
  },
  suscripciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

usuarioSchema.methods.compararPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);