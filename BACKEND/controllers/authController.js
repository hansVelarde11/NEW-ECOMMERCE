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
    return res.status(401).json({ message: "Credencias incorrectas" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};


exports.deleteUser = async (req, res) => {
    const userId = req.user.id;
  
    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });
  
    
    user.isDeleted = true;
    await user.save();
    
    res.json({ message: "Usuario marcado como eliminado con éxito" });
  };

exports.logout = (req, res) => {
  res.json({ message: "logout exitoso" });
};

exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findOne({ _id: id, isDeleted: false })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error al obtener el Usuario", error });
    });
};

exports.updateUser = async(req, res)=>{
    const { name, email, password } = req.body;
    const userId = req.user.id;
    
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json({ message: "Usuario actualizado con éxito", user });
  }
