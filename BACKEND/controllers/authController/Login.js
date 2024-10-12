const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  // buscar el usuario
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "credenciales incorrectas" });
  }

  // comparar la contraseña
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(404).json({ message: "credenciales incorrectas" });
  }

  // verificar si el usuario ha sido eliminado
  if (user.isDeleted) { // Cambiar de user.delete a user.isDeleted
    return res.status(403).json({ message: "usuario eliminado, no se pudo iniciar sesión" });
  }

  // generar el token JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  
  res.json({ token });
};

module.exports = login;
