const express = require("express");

const createProduct = require("../controllers/productController/createProduct")
const getProducts= require("../controllers/productController/getProducts")
const getProduct= require("../controllers/productController/getProduct")
const updateProduct= require("../controllers/productController/updateProduct")
const deleteProduct= require("../controllers/productController/deleteProduct")



const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, createProduct);


router.get("/:id", getProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
module.exports = router;
