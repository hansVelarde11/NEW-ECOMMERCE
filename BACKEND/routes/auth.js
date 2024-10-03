const express = require("express");
const {
  login,
  register,
  logout,
  getUsers,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getUsers);
router.get("/me", authMiddleware, getUser);
router.get("/me,", authMiddleware, getAllUsers);
router.put("/me", authMiddleware, updateUser);
router.delete("/me", authMiddleware, deleteUser);

module.exports = router;
