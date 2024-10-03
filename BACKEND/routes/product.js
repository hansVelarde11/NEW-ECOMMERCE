const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Asegúrate de que la ruta al controlador sea correcta

// Ruta para obtener todos los productos
router.get('/', productController.getProducts);

// Ruta para obtener un producto específico por ID
router.get('/:id', productController.getProduct);

// Ruta para crear un nuevo producto
router.post('/', productController.createProduct);

// Ruta para actualizar un producto existente
router.put('/:id', productController.updateProduct);

// Ruta para eliminar un producto (marcarlo como eliminado)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
