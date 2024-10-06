const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { RateLimiterMemory } = require("rate-limiter-flexible");

// Configuramos el rate-limiter para limitar intentos de login por IP
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 intentos de login
  duration: 15 * 60, // por cada 15 minutos
});

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Limitar los intentos fallidos por IP
    await rateLimiter.consume(req.ip);

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    if (error instanceof RateLimiterMemory) {
      // Si el usuario ha excedido los intentos fallidos
      return res.status(429).json({ message: "Demasiados intentos fallidos. Por favor, inténtelo más tarde." });
    }
    
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
