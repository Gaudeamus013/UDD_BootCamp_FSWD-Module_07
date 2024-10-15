// Importación del módulo dotenv-safe para cargar variables de entorno
const dotenv = require('dotenv-safe');

// Función para cargar las variables de entorno desde el archivo .env
const loadEnv = () => {
  dotenv.config({
    example: './.env.example', // Verificación con un archivo de ejemplo para asegurar que todas las variables estén presentes
  });
};

module.exports = loadEnv; // Exportación de la función para cargar las variables de entorno