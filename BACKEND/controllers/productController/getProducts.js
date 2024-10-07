const Product = require("../models/Product");

//Ver todos los productos activos
exports.getProducts = async (req, res) => {
    const products = await Product.findAll({
      where: {
        isDeleted: false,
      },
    });
    res.json(products);
  };