const User = require("../models/User");

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