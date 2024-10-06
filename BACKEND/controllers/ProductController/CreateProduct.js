const Product = require("../../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  // Validación si están los campos correspondientes
  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // Creando el producto en la base de datos
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    // Respuesta exitosa
    res.status(201).json({ message: "Producto creado con éxito", product });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};
