const bcrypt = require("bcryptjs");
const User = require("../models/User");

//Editar usuarios
exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
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
        .json({ message: "Usuario no encontrado o eliminado" });
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
  
    res.json({ message: "Usuario actualizado con éxito", user });
  };