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

//Ver todso los productos sin excesion
exports.getAllProducts = async (req, res) => {
  try {
    const products = await User.findAll();
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

//Ver un unico producto
exports.getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  if (!product) {
    return message("Producto no encontrado o eliminado");
  }

  res.json(product);
};

//"Eliminar producto"
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  if (!product) {
    return message("Producto no encontrado o ya eliminado");
  }

  product.isDeleted = true;
  await product.save();

  return message("Producto marcado como eliminado", product);
};

//Actualizar producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl } = req.body;

  const product = await Product.findOne({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  if (!product) {
    return message("Producto no encontrado o eliminado");
  }
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (imageUrl) product.imageUrl = imageUrl;

  await product.save();

  return message("Producto actualizado con éxito", product);
};

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
