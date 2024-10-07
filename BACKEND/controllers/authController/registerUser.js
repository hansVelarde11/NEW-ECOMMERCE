const bcrypt = require("bcryptjs");
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