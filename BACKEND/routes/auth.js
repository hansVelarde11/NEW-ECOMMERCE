const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware para verificar el token JWT

// Registro de usuario
router.post("/register", userController.register);

// Login de usuario
router.post("/login", userController.login);

// Logout de usuario (opcional, si solo quieres un mensaje)
router.post("/logout", authMiddleware, userController.logout);

// Actualización de usuario (debe estar autenticado)
router.put("/update", authMiddleware, userController.updateUser);

// Eliminar usuario (marcar como eliminado, debe estar autenticado)
router.delete("/delete", authMiddleware, userController.deleteUser);

// Obtener usuario por ID (debe estar autenticado)
router.get("/profile", authMiddleware, userController.getUser);

module.exports = router;
