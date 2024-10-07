const Product = require("../models/Product");

//Ver todso los productos sin excesion
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener los productos",
      });
    }
  };