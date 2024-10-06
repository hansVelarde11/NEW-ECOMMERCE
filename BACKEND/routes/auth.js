const express = require("express");
const router = express.Router();

// Importar controladores desde sus respectivos archivos
const createUser = require("../controllers/authController/createUser");
const login = require("../controllers/authController/login");
const logout = require("../controllers/authController/logout");
const getUser = require("../controllers/authController/getUser");
const getUsers = require("../controllers/authController/getUsers");
const getAllUsers = require("../controllers/authController/getAllUsers");
const updateUser = require("../controllers/authController/updateUser");
const deleteUser = require("../controllers/authController/deleteUser");

const authMiddleware = require("../middlewares/authMiddleware");

// Definir las rutas con los controladores correspondientes
router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getUser);
router.get("/users", authMiddleware, getUsers);
router.get("/all-users", authMiddleware, getAllUsers);
router.put("/me", authMiddleware, updateUser);
router.delete("/me", authMiddleware, deleteUser);

module.exports = router;
