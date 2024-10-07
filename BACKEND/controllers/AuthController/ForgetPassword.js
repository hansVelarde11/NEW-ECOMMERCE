const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const transporter = require('../../config/nodemailer'); // Importar el transportador

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar al usuario por su email
    const user = await User.findOne({ where: { email } });

    // Si no se encuentra el usuario
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar un token de restablecimiento de contraseña (válido por 1 hora)
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // URL para restablecer la contraseña
    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

    // Configurar el contenido del correo
    const mailOptions = {
      from: "ramos213@gmail.com", 
      to: user.email,
      subject: "Restablecimiento de contraseña",
      text: `Hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente enlace para cambiarla: ${resetURL}`,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions); // Usar el transportador importado

    // Enviar una respuesta de éxito
    res.status(200).json({ message: "Correo de restablecimiento de contraseña enviado" });
  } catch (error) {
    console.error("Error en forgetPassword:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
