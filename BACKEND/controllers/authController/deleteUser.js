const User = require("../models/User");

//"Eliminar" usuario
exports.deleteUser = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });
  
    if (!user)
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o ya eliminado" });
  
    user.isDeleted = true;
    await user.save();
  
    res.json({ message: "Usuario marcado como eliminado con éxito" });
  };