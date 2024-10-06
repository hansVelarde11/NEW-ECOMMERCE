exports.deleteAccount = async (req, res) => {
    const userId = req.user.id; // Suponiendo que estás usando el middleware de autenticación
  
    try {
      // Buscar al usuario en la base de datos
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Borrar el usuario de la base de datos
      await user.destroy();
  
      res.status(200).json({ message: "Cuenta borrada exitosamente" });
    } catch (error) {
      console.error("Error al borrar la cuenta:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  