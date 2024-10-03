const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.json({ message: "Usuario registrado con exito", user });

};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({ message: "Credencias incorrectas" });
  }

  if (user.delete) {
    return res.status(403).json({message: "Usuario eliminado, no se pudo iniciar sesion"})
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

exports.logout = (req, res) => {
  res.json({ message: "logout exitoso" });
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  //buscar el usuario y que no esté eliminado
  const user = await User.findOne({
    where: {
      id: userId,
      isDeleted: false
    }
  });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado o eliminado" });

  //  si hay nueva contra, se encripta antes de guardarla
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // actualizar los demás campos
  user.name = name || user.name;
  user.email = email || user.email;

  // guardar cambios
  await user.save();

  res.json({ message: "Usuario actualizado con éxito", user });
};

exports.deleteUser = async (req, res) => {
  const userId = req.user.id;

  // buscar el usuario 
  const user = await User.findOne({
    where: {
      id: userId,
      isDeleted: false
    }
  });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado o ya eliminado" });

  // marcar el usuario como eliminado
  user.isDeleted = true;
  await user.save();

  res.json({ message: "Usuario marcado como eliminado con éxito" });
};


exports.getUsers = async (req, res) => {
  try {
    // obtener todos los usuarios, incluidos los eliminados
    const users = await User.findAll();

    // enviar la lista de usuarios como respuesta
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });}
  }