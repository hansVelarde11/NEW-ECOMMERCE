//Ver a todos los usuarios sin excesion
const User = require("../models/User");

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