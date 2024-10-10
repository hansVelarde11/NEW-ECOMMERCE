const express = require('express');
const Login = require('../controllers/authController/Login');
const Register = require('../controllers/authController/Register');
const forgotPassword = require('../controllers/authController/forgotPassword');
const Logout = require('../controllers/authController/Logout');
const getUser = require('../controllers/authController/getUsers');
const updateUser = require('../controllers/authController/updateUser');
const deleteUser = require('../controllers/authController/deleteUser');

const authMiddleware = require('../middlewares/authMiddleware');
const limitLoginMiddleware = require('../middlewares/limitLoginMiddleware');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', Register);

// Ruta para iniciar sesión
router.post('/login', limitLoginMiddleware, Login);

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', forgotPassword); 

// Ruta para cerrar sesión
router.post('/logout', authMiddleware, Logout); 

// Ruta para obtener información del usuario autenticado
router.get('/users', authMiddleware, getUser); 

// Ruta para actualizar la información del usuario autenticado
router.put('/me', authMiddleware, updateUser);

// Ruta para eliminar el usuario autenticado
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;
