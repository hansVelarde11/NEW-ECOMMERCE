const Product = require("../../models/Product");


const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  });

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado o eliminado" });
  }

  res.json(product);
};
module.exports=getProduct;