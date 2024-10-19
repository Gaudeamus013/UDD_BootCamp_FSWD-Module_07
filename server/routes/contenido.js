const express = require('express');
const router = express.Router();
const Contenido = require('../models/Contenido');
const auth = require('../middleware/auth');
const multer = require('multer');
const { cloudinary, addWatermark } = require('../config/cloudinary');
const geoblock = require('../middleware/geoblock');
const crypto = require('crypto');

const upload = multer({ dest: 'uploads/' });

// ... (código existente)

// Obtener contenido por ID con geobloqueo y límite de visualizaciones
router.get('/:id', [auth, geoblock(['US', 'CA', 'MX'])], async (req, res) => {
  try {
    const contenido = await Contenido.findById(req.params.id).populate('creador', 'nombre');
    if (!contenido) {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
    }

    // Verificar límite de visualizaciones
    const userViews = contenido.vistas.get(req.usuario.id) || 0;
    if (userViews >= contenido.limiteVistas) {
      return res.status(403).json({ msg: 'Has alcanzado el límite de visualizaciones para este contenido' });
    }

    // Incrementar contador de vistas
    contenido.vistas.set(req.usuario.id, userViews + 1);
    await contenido.save();

    // Generar URLs firmadas para el contenido
    const signedUrls = contenido.imagenes.map(url => {
      const signature = crypto.createHmac('sha256', process.env.CONTENT_SECRET)
        .update(url)
        .digest('hex');
      return `${url}?sig=${signature}`;
    });

    res.json({
      ...contenido.toObject(),
      imagenes: signedUrls,
      videos: contenido.videos.map(url => {
        const signature = crypto.createHmac('sha256', process.env.CONTENT_SECRET)
          .update(url)
          .digest('hex');
        return `${url}?sig=${signature}`;
      })
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contenido no encontrado' });
    }
    res.status(500).send('Error del servidor');
  }
});

// ... (resto del código)

module.exports = router;