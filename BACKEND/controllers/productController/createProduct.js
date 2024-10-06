const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  // Verificar si ya existe un producto con el mismo nombre
  const existingProduct = await Product.findOne({
    where: {
      name,
      isDeleted: false, 
    },
  });

  if (existingProduct) {
    return res.status(400).json({ message: "Ya existe un producto con este nombre." });
  }

  // Crear el nuevo producto
  const product = await Product.create({
    name,
    description,
    price,
    stock,
    imageUrl,
  });

  res.status(201).json({ message: "Producto creado con éxito", product });
};
