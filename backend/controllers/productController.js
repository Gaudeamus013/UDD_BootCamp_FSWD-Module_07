const Product = require('../models/Product');

// Obtener productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error: error.message });
  }
};

// Actualizar inventario de producto
exports.actualizarInventarioProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.stock = cantidad;
    await producto.save();

    res.status(200).json({ mensaje: 'Inventario actualizado correctamente', producto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el inventario', error: error.message });
  }
};