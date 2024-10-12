const User = require('../../models/User');
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt para hashear la contraseña

const resetPassword = async (req, res) => {
    const { email, token, newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar el token y su expiración
        if (user.resetToken !== token || Date.now() > user.resetTokenExpiration) {
            return res.status(400).json({ message: 'Token inválido o expirado.' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Actualiza la contraseña con la versión hasheada
        user.resetToken = null; // Limpiar el token
        user.resetTokenExpiration = null; // Limpiar la expiración

        await user.save();

        res.json({ message: 'Contraseña restablecida con éxito.' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
};

module.exports = resetPassword;
