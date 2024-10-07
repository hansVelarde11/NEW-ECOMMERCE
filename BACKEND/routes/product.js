const express = require("express");
const { createProduct } = require("../controllers/productController/createProduct");
const { getProducts } = require("../controllers/productController/getProduct");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, createProduct);

module.exports = router;
