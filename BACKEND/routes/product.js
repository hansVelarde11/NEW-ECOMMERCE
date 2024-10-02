const express=require('express')
const {createProduct,deleteProduct,getProduct,updateProduct} = require('../controllers/productController')
const router=express.Router()
router.post ('/',createProduct)
router.delete('/',deleteProduct)
router.put('/',updateProduct)
router.get('/',getProduct)

module.exports=router