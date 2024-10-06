const Product = require("../models/Product");

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
  