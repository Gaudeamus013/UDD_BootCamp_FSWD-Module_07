const express = require('express');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
conectarDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/pagos', paymentRoutes);

// Middleware para manejo de errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;