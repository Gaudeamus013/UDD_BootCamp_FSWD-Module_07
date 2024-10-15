// Importación de módulos necesarios
const mongoose = require('mongoose');

// Definición del esquema del producto
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Agregar campos de creado y actualizado automáticamente
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
