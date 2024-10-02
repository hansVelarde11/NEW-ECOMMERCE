const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    stock,
    imageUrl,
  });
  res.json({ message: "Producto creado con exito", product });
};