const Product = require("../models/Product");

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  product.isDeleted = true;
  await product.save();

  res.json({ message: "Producto marcado como eliminado", product });
};
