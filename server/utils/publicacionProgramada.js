const Contenido = require('../models/Contenido');

const publicarContenidoProgramado = async () => {
  try {
    const ahora = new Date();
    const contenidoProgramado = await Contenido.find({
      estado: 'programado',
      fechaPublicacion: { $lte: ahora }
    });

    for (const contenido of contenidoProgramado) {
      contenido.estado = 'publicado';
      await contenido.save();
      console.log(`Contenido publicado: ${contenido.titulo}`);
    }

    console.log(`Se publicaron ${contenidoProgramado.length} contenidos programados.`);
  } catch (error) {
    console.error('Error al publicar contenido programado:', error);
  }
};

module.exports = { publicarContenidoProgramado };