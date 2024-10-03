const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Asegúrate de que el archivo db.js tiene la configuración de la conexión a PostgreSQL

const Producto = sequelize.define('Producto', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Producto;
//GetProducts

exports.GetProducts = (req,res) =>{
    res.status(200).json({
        success: true,
        data: Producto
    })
}


//CreateProduct

exports.CreateProduct = (req,res) =>{
    const newProduct = {
        id: Producto.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    };
    Producto.push(newProduct);
    res.status(201).json({
        success: true,
        data: newProduct
    });
};

//UpdateProduct

exports.updateProduct = (req, res) => {
    const productId = parseInt(req.params.id)
    const product = Producto.find(producto => producto.id === productId)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Producto no encontrado"
        })
    }

    if (req.body.name) {
        product.name = req.body.name
    }

    if (req.body.description){
        product.description = req.body.description
    }

    if (req.body.price){
        product.price = req.body.price
    }

    res.status(200).json({
        success: true,
        data: product
    })

}

//DeleteProduct

exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = Producto.findIndex(producto => producto.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Producto no encontrado"
        });
    }

    
    Producto.splice(productIndex, 1);

    res.status(200).json({
        success: true,
        message: "Producto eliminado exitosamente"
    });
};