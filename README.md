# Pet Pixel - Aplicación Fullstack SaaS

Pet Pixel es una aplicación web Fullstack de estilo SaaS inspirada en OnlyFans, pero adaptada a la temática de mascotas. Esta aplicación permite a los usuarios compartir y acceder a contenido exclusivo relacionado con mascotas.

## Características principales

- Registro e inicio de sesión de usuarios
- Perfiles de usuario (creadores de contenido y suscriptores)
- Carga y visualización de contenido exclusivo
- Sistema de suscripciones y pagos
- Panel de administración
- Mensajería en tiempo real
- Notificaciones
- Análisis y estadísticas para creadores

## Tecnologías utilizadas

### Frontend
- React (con Vite)
- React Router Dom
- Tailwind CSS
- Axios
- Socket.io-client
- Chart.js y react-chartjs-2

### Backend
- Node.js
- Express.js
- MongoDB (con Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js
- Stripe (para procesamiento de pagos)
- Socket.io
- Cloudinary (para almacenamiento de imágenes y videos)

## Estructura del proyecto

```
pet-pixel/
├── src/
│   ├── components/
│   │   ├── ContentViewer.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── Mensajeria.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationIndicator.jsx
│   │   ├── Notificaciones.jsx
│   │   └── VideoUpload.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── SocketContext.jsx
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Checkout.jsx
│   │   ├── ContentPage.jsx
│   │   ├── CreadorDashboard.jsx
│   │   ├── EventoProximo.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── SignUp.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── validations.js
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── config/
│   │   └── cloudinary.js
│   ├── middleware/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   └── geoblock.js
│   ├── models/
│   │   ├── Contenido.js
│   │   ├── Mensaje.js
│   │   ├── Notificacion.js
│   │   ├── Pago.js
│   │   ├── Suscripcion.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── analisis.js
│   │   ├── contenido.js
│   │   ├── mensajes.js
│   │   ├── notificaciones.js
│   │   ├── pagos.js
│   │   ├── suscripciones.js
│   │   └── usuarios.js
│   ├── utils/
│   │   └── publicacionProgramada.js
│   └── index.js
├── .env
├── package.json
├── README.md
└── vite.config.js
```

## Configuración y ejecución

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/pet-pixel.git
   cd pet-pixel
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   MONGODB_URI=mongodb+srv://gaudeamus013:F3n1x013@your_cluster.mongodb.net/pet_pixel?retryWrites=true&w=majority
   JWT_SECRET=Machapalapachala
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Inicia el servidor de desarrollo y el backend:
   ```
   npm run dev:all
   ```

5. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en funcionamiento.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos antes de realizar un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.