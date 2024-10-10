const User = require('../../models/User');

const deleteUser = async (req, res) => {
  const userId = req.user.id;

  // Buscar el usuario
  const user = await User.findOne({
    where: {
      id: userId,
      isDeleted: false
    }
  });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado o ya eliminado" });
  }

  // Marcar el usuario como eliminado
  user.isDeleted = true;
  await user.save();

  res.json({ message: "Usuario marcado como eliminado con éxito" });
};

module.exports = deleteUser;