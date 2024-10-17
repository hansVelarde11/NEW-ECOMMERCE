const express = require('express');
const passport = require('../controllers/authController/passport'); // Importar la configuración de Passport
const Login = require('../controllers/authController/login'); // Importar el controlador de login
const Register = require('../controllers/authController/register'); // Importar el controlador de registro
const forgotPassword = require('../controllers/authController/forgotPassword'); // Importar controlador para restablecimiento de contraseña
const Logout = require('../controllers/authController/logout'); // Importar controlador de logout
const getUser = require('../controllers/authController/getUsers'); // Importar controlador para obtener usuarios
const updateUser = require('../controllers/authController/updateUser'); // Importar controlador para actualizar usuarios
const deleteUser = require('../controllers/authController/deleteUser'); // Importar controlador para eliminar usuarios
const resetPassword = require("../controllers/authController/reset-password"); // Importar controlador para restablecer contraseña
const authMiddleware = require('../middlewares/authMiddleware'); // Importar middleware de autenticación
const limitLoginMiddleware = require('../middlewares/limitLoginMiddleware'); // Importar middleware para limitar inicio de sesión
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', Register);

// Ruta para iniciar sesión
router.post('/login', limitLoginMiddleware, Login);
// Ruta para iniciar sesión con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login' // Redirige aquí si falla la autenticación
}), 

(req, res) => {
    // En lugar de redirigir, respondemos con un mensaje de éxito en JSON
    res.json({
        success: true,
        message: 'Autenticación con Google exitosa',
        user: {
            name: req.user.name,
            email: req.user.email
        }
    });
});
  

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Ruta para cerrar sesión
router.post('/logout', authMiddleware, Logout);

// Ruta para obtener información del usuario autenticado
router.get('/users', authMiddleware, getUser);

// Ruta para actualizar la información del usuario autenticado
router.put('/update', authMiddleware, updateUser);

// Ruta para eliminar el usuario autenticado
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;
