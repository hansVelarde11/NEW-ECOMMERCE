const Product = require("../../models/Product");

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Vuelve al Id numerico
    const productId = parseInt(id, 10);
    
    //Menciona si el producto ID es valido NAN( Not a Number)
    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    const product = await Product.findOne({
      where: {
        id: productId,
        isDeleted: false
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado o ya eliminado" });
    }

    product.isDeleted = true;
    await product.save();

    res.json({ message: "Producto marcado como eliminado", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
