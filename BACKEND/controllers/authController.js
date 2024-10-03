const Usuario = sequelize.define('Usuario', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'cliente'
    }
  });
  
  module.exports = Usuario;
const bcrypt = require('bcrypt');

//registerUser

exports.registerUser = (req, res) =>{

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);


    const newUser = {
        id: Usuario.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role || 'cliente'
    }

    Usuario.push(newUser);
    res.status(201).json({
        success: true,
        data: newUser
    });
};

//updateUser

exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id)
    const user = Usuario.find(usuario => usuario.id === userId)

    if(!user){
        return res.status(404).json({
            success: false,
            message: "Cliente no encontrado"
        })
    }
 
   if (req.body.name) {
    user.name = req.body.name;
}


if (req.body.email) {
    user.email = req.body.email;
}


if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
}

res.status(200).json({
    success: true,
    data: user
});
};

//delete User

exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = Usuario.findIndex(usuario => usuario.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Usuario no encontrado"
        });
    }

   
    Usuario.splice(userIndex, 1);

    res.status(200).json({
        success: true,
        message: "Usuario eliminado exitosamente"
    });
};




