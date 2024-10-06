const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.json({ message: "Usuario registrado con exito", user });
};


