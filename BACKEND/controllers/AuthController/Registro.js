const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario en la base de datos
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    // Capturar cualquier error durante el registro
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};
