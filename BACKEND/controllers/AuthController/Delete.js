const User = require("../../models/User");

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Busca el usuario que no esté marcado como eliminado
    const user = await User.findOne({
      where: {
        id: userId,
        isDeleted: false
      }
    });

    // Si no encuentra el usuario o ya está eliminado
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado o ya eliminado" });
    }

    // Marcando el usuario como eliminado
    user.isDeleted = true;
    await user.save();

    // Respuesta exitosa
    res.json({ message: "Usuario marcado como eliminado con éxito" });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ message: "Error al intentar eliminar el usuario" });
  }
};
