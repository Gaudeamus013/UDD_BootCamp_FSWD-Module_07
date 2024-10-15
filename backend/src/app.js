// Importación de módulos necesarios
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const loadEnv = require('./config/dotenvConfig');
const { errorHandler } = require('./middleware/errorMiddleware');
const { limiter } = require('./middleware/rateLimiter');

// Rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

// Cargar variables de entorno
loadEnv();

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(express.json()); // Middleware para parsear JSON
app.use(cors()); // Middleware para permitir solicitudes desde otros orígenes
app.use(morgan('dev')); // Middleware para el registro de solicitudes HTTP
app.use(limiter); // Middleware para limitar el número de peticiones

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;