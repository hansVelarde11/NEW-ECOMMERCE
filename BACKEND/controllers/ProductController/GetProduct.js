const Product = require("../../models/Product");

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar producto por id y buscando que no este eliminado
    const product = await Product.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    });

    // Verificar si el producto existe
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado o eliminado" });
    }
  
 
    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
