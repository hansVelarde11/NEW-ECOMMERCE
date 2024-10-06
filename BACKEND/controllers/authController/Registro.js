const bcrypt = require('bcrypt');
const User = require('../models/User'); 


exports.register = async (req, res) => {
const {name, email, password}= req.body;

//verificamos si el usurio existe:
const userExiste= await User.findOne({email});
if(userExiste)return res.status(400).json({message: "el correo electronico ya existente"})

//hash contraseña segura
const hashedPassword = await bcrypt.hash(password, 10);
//creacion de user
const user = await User.create({ name, email, password: hashedPassword });
res.json({ message: "Usuario registrado con exito", user });

};
