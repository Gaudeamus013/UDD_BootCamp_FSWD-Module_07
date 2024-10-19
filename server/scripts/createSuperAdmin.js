import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

// Importar el modelo de Usuario
import Usuario from '../models/Usuario.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

mongoose.connection.on('error', err => {
  console.error('Error de conexión a MongoDB:', err);
});

async function createSuperAdmin() {
  try {
    const existingAdmin = await Usuario.findOne({ nombreUsuario: 'SuperAdmin' });
    if (existingAdmin) {
      console.log('El SuperAdmin ya existe');
      return;
    }

    const hashedPassword = await bcrypt.hash('Super@dmin123', 10);

    const superAdmin = new Usuario({
      nombreUsuario: 'SuperAdmin',
      nombre: 'Super',
      apellido: 'Admin',
      email: 'superadmin@petpixel.com',
      password: hashedPassword,
      tipoUsuario: 'superadmin'
    });

    await superAdmin.save();
    console.log('SuperAdmin creado exitosamente');
  } catch (error) {
    console.error('Error al crear SuperAdmin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconexión de MongoDB');
  }
}

createSuperAdmin();