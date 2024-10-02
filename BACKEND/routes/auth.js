const express=require('express')
const {deleteUser,registerUser,updateUser} = require('../controllers/authController')
const  router  = require('./product')

const router=express.Router()
router.post ('/',registerUser)
router.delete('/',deleteUser)
router.put('/',updateUser)

module.exports=router