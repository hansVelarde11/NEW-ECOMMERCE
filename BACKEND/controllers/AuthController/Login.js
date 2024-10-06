const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    
    // Si no existe el usuario o las credenciales son incorrectas
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar si el usuario ha sido eliminado
    if (user.deleted) { // Asegúrate que el campo sea 'deleted' o 'isDeleted'
      return res.status(403).json({ message: "Usuario eliminado, no se pudo iniciar sesión" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Enviar token al cliente
    res.json({ token });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
