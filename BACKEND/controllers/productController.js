const Product = require("../models/Product")


exports.getProducts = async (req, res) => {

    const products = await Product.findAll({
      where: {
        isDeleted: false
      }
    });
    res.json(products);
  };
  
  exports.getProduct = async (req, res) => {
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
  

  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    const product = await Product.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    });
  
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado o ya eliminado" });
    }
  
    product.isDeleted = true;
    await product.save();
  
    res.json({ message: "Producto marcado como eliminado", product });
  };
  


  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;
  
    const product = await Product.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    });
  
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado o eliminado" });
    }
  
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (imageUrl) product.imageUrl = imageUrl;
  
    await product.save();
  
    res.json({ message: "Producto actualizado con éxito", product });
  };




  exports.createProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });
    res.json({ message: "Producto creado con exito", product });
  };