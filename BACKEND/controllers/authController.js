const Usuario = [
    { id: 1, name: 'Higor Huaman', email: 'higor1302@gmail.com', password: 'Tutia_laLoca2', role: 'cliente' },
    { id: 2, name: 'Carlos Ramirez', email: 'carlos.ramirez@gmail.com', password: 'C4rlos123!', role: 'admin' },
    { id: 3, name: 'María Fernanda', email: 'mariaf@gmail.com', password: 'MFer_password99', role: 'cliente' },
    { id: 4, name: 'Lucía Pérez', email: 'lucia.perez@hotmail.com', password: 'LuciaPerez2020', role: 'cliente' },
    { id: 5, name: 'Juan Torres', email: 'juan.torres@yahoo.com', password: 'Ju4nTorres!', role: 'empleado' }
];

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
   // Actualizar el nombre
   if (req.body.name) {
    user.name = req.body.name;
}

// Actualizar el email
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




