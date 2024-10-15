// Importación de módulos necesarios
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

// Función para poblar la base de datos con datos de prueba
const seedData = async () => {
  try {
    // Crear productos de prueba
    const products = [
      { name: 'Perfume A', price: 100, description: 'Descripción A', stock: 10 },
      { name: 'Perfume B', price: 150, description: 'Descripción B', stock: 20 },
      { name: 'Perfume C', price: 200, description: 'Descripción C', stock: 15 },
      { name: 'Perfume D', price: 250, description: 'Descripción D', stock: 30 },
      { name: 'Perfume E', price: 300, description: 'Descripción E', stock: 25 },
    ];
    await Product.insertMany(products);
    console.log('Productos de prueba creados');

    // Crear usuarios de prueba
    const users = [
      { name: 'Juan Perez', email: 'juan@correo.com', password: '123456' },
      { name: 'Maria Lopez', email: 'maria@correo.com', password: '123456' },
      { name: 'Pedro Gomez', email: 'pedro@correo.com', password: '123456' },
      { name: 'Ana Torres', email: 'ana@correo.com', password: '123456' },
      { name: 'Lucia Diaz', email: 'lucia@correo.com', password: '123456' },
    ];
    await User.insertMany(users);
    console.log('Usuarios de prueba creados');

    // Crear pedidos de prueba
    const orders = [
      {
        user: users[0]._id,
        orderItems: [
          { name: 'Perfume A', qty: 2, price: 100, product: products[0]._id },
        ],
        shippingAddress: {
          address: 'Calle 123',
          city: 'Santiago',
          postalCode: '12345',
          country: 'Chile',
        },
        paymentMethod: 'PayPal',
        itemsPrice: 200,
        taxPrice: 19,
        shippingPrice: 10,
        totalPrice: 229,
      },
      {
        user: users[1]._id,
        orderItems: [
          { name: 'Perfume B', qty: 1, price: 150, product: products[1]._id },
        ],
        shippingAddress: {
          address: 'Calle 456',
          city: 'Valparaiso',
          postalCode: '67890',
          country: 'Chile',
        },
        paymentMethod: 'Transbank',
        itemsPrice: 150,
        taxPrice: 19,
        shippingPrice: 5,
        totalPrice: 174,
      },
    ];
    await Order.insertMany(orders);
    console.log('Pedidos de prueba creados');
  } catch (error) {
    console.error(`Error creando datos de prueba: ${error.message}`.red.bold);
  }
};

module.exports = seedData;