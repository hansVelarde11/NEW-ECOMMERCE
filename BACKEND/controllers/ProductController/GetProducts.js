const Product = require("../../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        isDeleted: false
      }
    });
    
   //Devuelve una respuesta correcta con los productos
    res.status(200).json(products);
  } catch (error) {
   

    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};
