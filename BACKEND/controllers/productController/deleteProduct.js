const Product = require("../models/Product");

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