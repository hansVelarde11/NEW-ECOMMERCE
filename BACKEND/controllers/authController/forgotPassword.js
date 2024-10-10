// controllers/authController.js
const User = require('../../models/User');
const sendEmail = require('../../Utils/sendEmail');
const crypto = require('crypto');

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Generar el token y la expiración
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hora

        // Guardar el token en la base de datos
        await user.save();

        // Crear el enlace de restablecimiento de contraseña
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Enviar el correo usando la función de utilidad
        await sendEmail(user, 'Restablecer Contraseña', `Haz clic en el enlace para restablecer tu contraseña: ${resetLink}`);

        res.json({ message: 'Correo de restablecimiento enviado.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo.' });
    }
};

module.exports = forgotPassword;