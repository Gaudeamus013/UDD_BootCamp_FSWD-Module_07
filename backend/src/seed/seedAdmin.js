// Importación de módulos necesarios
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Función para poblar la base de datos con un usuario administrador predefinido
const seedAdmin = async () => {
  try {
    // Verificar si el usuario administrador ya existe
    const adminExists = await User.findOne({ email: 'admin@cruzyvalencia.com' });
    if (!adminExists) {
      // Crear un hash para la contraseña del administrador
      const hashedPassword = await bcrypt.hash('admin123', 10);
      // Crear el usuario administrador
      await User.create({
        name: 'Administrador',
        email: 'admin@cruzyvalencia.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Usuario administrador creado correctamente');
    } else {
      console.log('El usuario administrador ya existe');
    }
  } catch (error) {
    console.error(`Error al crear el usuario administrador: ${error.message}`.red.bold);
  }
};

module.exports = seedAdmin;
