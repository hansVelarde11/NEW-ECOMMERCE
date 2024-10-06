const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    // Buscar el usuario por ID y verificar que no esté eliminado
    const user = await User.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado o eliminado" });
    }

    // Si se proporciona una contraseña, encriptarla
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Verificar si el email ya está en uso por otro usuario
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "El correo electrónico ya está en uso" });
      }
      user.email = email;
    }

    // Actualizar otros campos
    user.name = name || user.name;

    // Guardar los cambios
    await user.save();

    // Excluir la contraseña del objeto de usuario en la respuesta
    const { password: _, ...updatedUser } = user.toJSON();

    res.json({ message: "Usuario actualizado con éxito", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};
