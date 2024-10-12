const bcrypt = require('bcrypt');
const User = require('../../models/User');


const register = async (req, res) => {
const {name, email, password}= req.body;

// Validación de campos
if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
}

// Verificar si el usuario ya existe
const existingUser = await User.findOne({ where: { email } });
if (existingUser)return res.status(400).json({ message: 'El usuario ya está registrado' });
// Encriptar la contraseña antes de guardarla
const hashedPassword = await bcrypt.hash(password, 10);

// Crear el nuevo usuario
const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
});

// Devolver el nuevo usuario registrado
return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });

};
module.exports = register;