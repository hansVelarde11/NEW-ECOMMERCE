const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('Product', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: { type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: { type: DataTypes.FLOAT, allowNull:false},
    stock: {type: DataTypes.INTEGER,  allowNull:false},
    imageUrl: { type: DataTypes.STRING},
    isDeleted: {type: sequelize.BOOLEAN, defaultValue: false}
})

module.exports = Product