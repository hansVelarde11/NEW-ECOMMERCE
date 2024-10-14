const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Cambiar a true para conexiones seguras
  auth: {
    user: "ranmogonzales@gmail.com", // Tu correo electrónico
    pass: "njts lltc tonl bsrx", // La contraseña de aplicación
  },
});

// Verificar la conexión del transportador
transporter.verify((error, success) => {
  if (error) {
    console.error("Error en la verificación del transportador:", error);
  } else {
    console.log("Transportador está listo para enviar correos");
  }
});

module.exports = transporter;
