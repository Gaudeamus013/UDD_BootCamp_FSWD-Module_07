// Importación de módulos necesarios
const http = require('http');
const app = require('./app');

// Definir el puerto del servidor
const PORT = process.env.PORT || 5000;

// Crear el servidor HTTP
const server = http.createServer(app);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`.yellow.bold);
});