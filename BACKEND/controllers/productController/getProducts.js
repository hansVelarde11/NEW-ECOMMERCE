const Product = require("../../models/Product");


const getProducts = async (req, res) => {
  const products = await Product.findAll({
    where: {
      isDeleted: false
    }
  });
  res.json(products);
};
module.exports =getProducts;