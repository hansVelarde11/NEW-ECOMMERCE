const express = require('express')
const {login} = require('../controllers/authController/login')
const {register} = require('../controllers/authController/register')
const {updateProfile} = require('../controllers/authController/updateProfile')
const {requestPasswordReset,resetPassword} = require('../controllers/authController/updatePassword')
const {deleteAccount} = require('../controllers/authController/deleteAccount')
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put("/updateProfile", authenticateToken, updateProfile);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.delete("/delete-account", authenticateToken, deleteAccount);

module.exports = router