const cors = require('cors');

// Añade esta línea antes de las rutas
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));