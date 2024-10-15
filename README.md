# Cruz y Valencia Ecommerce

## Descripción del Proyecto

Cruz y Valencia Ecommerce es una plataforma de comercio electrónico que permite la venta de perfumes nicho tanto a nivel nacional como internacional. Esta aplicación web proporciona una experiencia de usuario completa, con funcionalidades que incluyen la navegación por un catálogo de productos, la gestión de un carrito de compras, y la realización de pedidos con múltiples opciones de pago.

El proyecto se ha desarrollado utilizando un stack de tecnologías modernas, tales como:

- **Frontend**: React.js, Next.js, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Despliegue**: Render.com para el backend y Vercel para el frontend

## Características Principales

- **Catálogo de Productos**: Productos de perfumería con detalles de precios, descripciones y disponibilidad en stock.
- **Carrito de Compras**: Funcionalidad de añadir y eliminar productos, así como de ajustar cantidades.
- **Autenticación y Autorización**: Registro e inicio de sesión de usuarios, con roles de administrador y usuario.
- **Gestión de Pedidos**: Los usuarios pueden realizar pedidos y seguir el estado de sus compras.
- **Pasarelas de Pago**: Integración con diferentes pasarelas de pago como PayPal, Transbank y Mercado Pago.
- **Internacionalización (i18n)**: La aplicación está disponible en varios idiomas, incluidos español, inglés, francés, alemán, italiano, portugués, catalán, gallego, euskera y mapuche.

## Estructura del Proyecto

```
CruzYValencia-Ecommerce/
|
├── frontend/  # Frontend desarrollado con Next.js y React
│   ├── public/  # Archivos estáticos (imágenes, fuentes, etc.)
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/  # Páginas de la aplicación
│   │   ├── context/  # Context API para manejar estados globales
│   │   ├── hooks/  # Custom hooks
│   │   ├── styles/  # Archivos CSS con TailwindCSS
│   │   ├── i18n/  # Archivos de internacionalización
│   │   └── utils/  # Utilidades varias
│   └── tailwind.config.js  # Configuración de TailwindCSS
│
├── backend/  # Backend desarrollado con Node.js y Express
│   ├── src/
│   │   ├── controllers/  # Controladores para manejar la lógica de negocio
│   │   ├── models/  # Modelos de datos con Mongoose
│   │   ├── routes/  # Rutas de la API
│   │   ├── middleware/  # Middlewares de autenticación, manejo de errores, etc.
│   │   ├── config/  # Configuración de la base de datos y variables de entorno
│   │   ├── utils/  # Utilidades como envío de emails y manejo de JWT
│   │   ├── seed/  # Scripts para poblar la base de datos con datos de prueba
│   │   ├── app.js  # Configuración principal de Express
│   │   └── server.js  # Servidor HTTP
│   ├── package.json  # Dependencias del backend
│   ├── swagger/  # Documentación de la API con Swagger
│   └── .env  # Variables de entorno para el backend
│
├── deployment/  # Configuraciones para despliegue
│   ├── render.yaml  # Configuración de Render para el backend
│   └── vercel.json  # Configuración de Vercel para el frontend
│
└── README.md  # Documentación del proyecto
```

## Instalación y Ejecución Local

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Gaudeamus013/UDD_BootCamp_FSWD-Module_05.git
   cd CruzYValencia-Ecommerce
   ```

2. Configura las variables de entorno:
   - Crea un archivo `.env` en la carpeta `backend/` basado en el archivo `.env.example` y llena los valores necesarios.

3. Instala las dependencias tanto del frontend como del backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Ejecución

1. Inicia el backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Inicia el frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Despliegue

### Backend en Render.com

El backend está configurado para ser desplegado en Render.com. La configuración necesaria está en el archivo `deployment/render.yaml`. Render.com se encarga de manejar la instalación de dependencias, el despliegue y la gestión del servidor.

### Frontend en Vercel

El frontend está configurado para ser desplegado en Vercel. La configuración necesaria se encuentra en el archivo `deployment/vercel.json`. Vercel proporciona una experiencia fluida para desplegar aplicaciones desarrolladas con Next.js.

## Documentación de la API

La documentación de la API se encuentra disponible utilizando Swagger. Para acceder a la documentación localmente, inicia el backend y luego navega a `http://localhost:5000/api-docs`.

## Scripts de Población de Datos

Para poblar la base de datos con datos de prueba, se han creado los siguientes scripts:

- **Crear Usuario Administrador**: Ejecuta el script para crear un usuario administrador predefinido.
  ```bash
  cd backend
  npm run seed:admin
  ```

- **Poblar Datos de Prueba**: Ejecuta el script para agregar productos, usuarios y pedidos de prueba.
  ```bash
  npm run seed:data
  ```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cualquier cambio importante antes de enviar un pull request.

## Licencia

Este proyecto está bajo la licencia ISC.

