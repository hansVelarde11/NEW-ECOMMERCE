const bcrypt = require('bcrypt');
const User = require('../../models/User');;

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  // buscar el usuario y verificar que no esté eliminado
  const user = await User.findOne({
    where: {
      id: userId,
      isDeleted: false
    }
  });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado o eliminado" });
  }

  // si hay nueva contraseña se encripta antes de guardarla
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // actualizar los demás campos solo si se proporciona un valor nuevo
  user.name = name !== undefined ? name : user.name;
  user.email = email !== undefined ? email : user.email;

  // guardar cambios
  await user.save();

  res.json({ message: "Usuario actualizado con éxito", user: { id: user.id, name: user.name, email: user.email } });
};

module.exports =updateUser;