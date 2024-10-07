const Product = require("../models/Product");

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