const express = require("express");
const router = express.Router();
const { register } = require("../controllers/AuthController/Registro");
const { login } = require("../controllers/AuthController/Login");
const { logout } = require("../controllers/AuthController/Logout");
const { getUser } = require("../controllers/AuthController/GetUser");
const { deleteUser } = require("../controllers/AuthController/Delete");
const { updateUser } = require("../controllers/AuthController/Update");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout); 
router.get("/me", authMiddleware, getUser);     
router.put("/update", authMiddleware, updateUser); 
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;
