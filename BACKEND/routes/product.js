const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.get("/",getAllProducts)
router.post("/", authMiddleware, createProduct);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
module.exports = router;