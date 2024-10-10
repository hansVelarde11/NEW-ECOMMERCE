const User = require('../../models/User');

const getUsers = async (req, res) => {
  try {
      const users = await User.findAll();
      res.json(users);
  } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
};
module.exports =getUsers;
