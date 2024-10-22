const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const User = require ('../models/User')
const Product = require ('../models/Product')

const Order = sequelize.define('Order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, references: {model: User, key: 'id'}},
    productId: {type: DataTypes.INTEGER, references: {model: Product, key: 'id'}},
    quantify: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 1},
    totalAmount: {type: DataTypes.FLOAT, allowNull:false},
    status: {type: DataTypes.STRING, defaultValue: 'pendiente'}
})

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order