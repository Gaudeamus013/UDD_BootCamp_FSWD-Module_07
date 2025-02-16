const multer = require('multer');
const storage = multer.memoryStorage(); // Almacenamiento en memoria para subir a Cloudinary
const upload = multer({ storage });
module.exports = upload;
