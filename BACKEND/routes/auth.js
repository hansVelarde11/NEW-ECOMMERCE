const express = require('express');
const {
    login,
    register,
    logout,
    getUser,
    updateUser,
    deleteUser,
    forgotPassword
} = require('../controllers/authController'); 
const authMiddleware = require('../middlewares/authMiddleware');
const limitLoginMiddleware = require('../middlewares/limitLoginMiddleware');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión, aplica el middleware de limitación de intentos
router.post('/login', limitLoginMiddleware , login);

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', forgotPassword); 

// Ruta para cerrar sesión, aplica el middleware de autenticación
router.post('/logout', authMiddleware, logout); 

// Ruta para obtener información del usuario autenticado
router.get('/me', authMiddleware, getUser); 

// Ruta para actualizar la información del usuario autenticado
router.put('/me', authMiddleware, updateUser);

// Ruta para eliminar el usuario autenticado
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;
