// Importación del módulo de Mongoose para interactuar con la base de datos MongoDB
const mongoose = require('mongoose');

// Función para conectar la base de datos
const connectDB = async () => {
  try {
    // Conexión a la base de datos utilizando la URI almacenada en las variables de entorno
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1); // Cerrar el proceso si no se puede conectar a la base de datos
  }
};

module.exports = connectDB; // Exportación de la función de conexión