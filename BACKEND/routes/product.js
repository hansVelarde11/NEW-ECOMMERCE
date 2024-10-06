const express = require("express");
const {
  createProduct,
  getProducts,
} = require("../controllers/productController/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, createProduct);

module.exports = router;
