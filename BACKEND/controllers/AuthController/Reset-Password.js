const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar al usuario por ID
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Actualizar la contraseña en la base de datos
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
      console.error("Error en resetPassword:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  