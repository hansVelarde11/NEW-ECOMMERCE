const User = require("../../models/User");

exports.getUser = async (req, res) => {
  try {
    // Asegúrate de que el req.user existe y tiene un id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
