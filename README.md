# Pet Pixel - Aplicación Fullstack SaaS

Pet Pixel es una aplicación web Fullstack de estilo SaaS inspirada en OnlyFans, pero adaptada a la temática de mascotas. Esta aplicación permite a los usuarios compartir y acceder a contenido exclusivo relacionado con mascotas.

## Características principales

- Registro e inicio de sesión de usuarios
- Perfiles de usuario (creadores de contenido y suscriptores)
- Carga y visualización de contenido exclusivo
- Sistema de suscripciones y pagos
- Panel de administración

## Tecnologías utilizadas

### Frontend
- React (con Vite)
- React Router Dom
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (con Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js
- Stripe (para procesamiento de pagos)

## Estructura del proyecto

```
pet-pixel/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   └── package.json
├── .env
└── README.md
```

## Configuración y ejecución

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/pet-pixel.git
   cd pet-pixel
   ```

2. Instala las dependencias del servidor:
   ```
   cd server
   npm install
   ```

3. Instala las dependencias del cliente:
   ```
   cd ../client
   npm install
   ```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
   ```
   MONGODB_URI=tu_uri_de_mongodb
   JWT_SECRET=tu_secreto_jwt
   STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
   ```

5. Inicia el servidor:
   ```
   cd ../server
   npm start
   ```

6. Inicia el cliente:
   ```
   cd ../client
   npm run dev
   ```

7. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos antes de realizar un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.