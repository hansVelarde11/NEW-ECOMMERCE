const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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