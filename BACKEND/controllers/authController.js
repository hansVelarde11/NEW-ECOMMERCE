const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Registrar usuario / reactivar usuarios "eliminados"
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Buscar si ya existe un usuario con el mismo email
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      
      if (existingUser.isDeleted) {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.name = name;
        existingUser.password = hashedPassword;
        existingUser.isDeleted = false;
        await existingUser.save();

        return res.json({
          message: "Cuenta restaurada con éxito",
          user: existingUser
        });
      } else {
        return res.status(400).json({ message: "El correo ya está en uso" });
      }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

//Iniciio de sesion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({ message: "Credencias incorrectas" });
  }

  if (user.isDeleted) {
    return res.status(403).json({ message: "Este usuario no existe" });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

//Cerrar session(aun no funka xd)
exports.logout = (req, res) => {
  res.json({ message: "logout exitoso" });
};

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

//Ver a todos los usuarios sin excesion
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

//Ver a los usuarios activos
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isDeleted: false
      }
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

//Ver un unico usuario
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado o eliminado",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
    });
  }
};