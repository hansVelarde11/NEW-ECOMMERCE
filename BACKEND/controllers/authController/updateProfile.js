const { check, validationResult } = require("express-validator");

exports.updateProfile = [
  // Validación de los campos
  check("email").optional().isEmail().withMessage("Por favor, proporciona un email válido"),
  check("password").optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  
  async (req, res) => {
    // Capturar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const userId = req.user.id;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (name) user.name = name;
      if (email) user.email = email;

      if (password) {
        const bcrypt = require("bcryptjs");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();
      res.json({ message: "Perfil actualizado exitosamente" });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
];
