const express = require("express");
const router = express.Router();

// Importar controladores desde sus respectivos archivos
const createProduct = require("../controllers/productController/createProduct");
const deleteProduct = require("../controllers/productController/deleteProduct");
const getProducts = require("../controllers/productController/getProducts");
const getAllProducts = require("../controllers/productController/getAllProducts");
const getProduct = require("../controllers/productController/getProduct");
const updateProduct = require("../controllers/productController/updateProduct");

const authMiddleware = require("../middlewares/authMiddleware");

// Definir las rutas con los controladores correspondientes


router.get("/active", getProducts);
router.get("/all", getAllProducts);
router.post("/", authMiddleware, createProduct);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;

