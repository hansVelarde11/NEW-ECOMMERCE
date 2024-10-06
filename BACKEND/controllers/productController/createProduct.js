const Product = require("../models/Product");

//crear producto
exports.createProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });
    return message("Producto creado con exito", product);
  };
  