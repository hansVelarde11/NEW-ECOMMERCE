const crypto = require("crypto");
const User = require("../../models/User");
const nodemailer = require("nodemailer");

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar un token único
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Aquí puedes guardar el token y la fecha de expiración en la base de datos
    // por ejemplo en una tabla de restablecimiento de contraseñas
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token válido por 1 hora
    await user.save();

    // Enviar correo electrónico con el enlace para restablecer la contraseña
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Solicitud de restablecimiento de contraseña",
      text: `Para restablecer su contraseña, haga clic en el siguiente enlace: 
      http://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Se ha enviado un enlace para restablecer la contraseña" });
  } catch (error) {
    console.error("Error al solicitar el restablecimiento de contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Buscar al usuario con el token y verificar la expiración
      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpiration: { [Op.gt]: Date.now() }, // Verifica que no esté expirado
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Token inválido o expirado" });
      }
  
      // Cifrar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // Limpiar el token y la fecha de expiración
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();
  
      res.status(200).json({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
