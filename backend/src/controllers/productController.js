// Importaciones necesarias
const Product = require('../models/Product');

// Controlador para obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      stock,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

module.exports = { getProducts, createProduct };