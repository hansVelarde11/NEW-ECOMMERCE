const User = require("../models/User");

//Ver un unico usuario
exports.getUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findOne({
        where: {
          id: id,
          isDeleted: false
        }
      });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado o eliminado",
        });
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener el usuario",
      });
    }
  };