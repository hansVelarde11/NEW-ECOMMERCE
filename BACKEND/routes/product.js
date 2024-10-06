const express = require('express');
const router = express.Router();
const { createProduct } = require("../controllers/ProductController/CreateProduct");
const { deleteProduct } = require("../controllers/ProductController/DeleteProduct");
const { getProduct } = require("../controllers/ProductController/GetProduct");
const { getProducts } = require("../controllers/ProductController/GetProducts");
const { updateProduct } = require("../controllers/ProductController/UpdateProduct");


router.post("/", createProduct);                
router.get("/", getProducts);                   
router.get("/:id", getProduct);                 
router.put("/:id", updateProduct);              
router.delete("/:id", deleteProduct);           

module.exports = router;