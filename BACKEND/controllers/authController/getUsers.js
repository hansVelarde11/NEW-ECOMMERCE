const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const { includeDeleted } = req.query; 

  // Obtener usuarios según la condición
  const users = includeDeleted === 'true'
    ? await User.findAll() //  todos los usuarios, incluidos los eliminados
    : await User.findAll({ where: { isDeleted: false } }); // solo usuarios activos

  //  respuesta
  res.status(200).json({
    success: true,
    data: users,
  });
};
