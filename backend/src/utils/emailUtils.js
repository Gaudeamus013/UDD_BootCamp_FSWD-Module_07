// Importación de módulos necesarios
const nodemailer = require('nodemailer');

// Función para enviar un correo electrónico
const sendEmail = async (options) => {
  // Crear el transporte de correo con las credenciales de configuración
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Definir los detalles del correo electrónico
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Enviar el correo electrónico
  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };