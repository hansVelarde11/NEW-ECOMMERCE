const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')
const Product = require('./Product')


const Cart = sequelize.define('Cart',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, references: {model: User, key: 'id'}},
    productId: {type: DataTypes.INTEGER, references: {model:Product, key:'id'}},
    quanty: {type: DataTypes.INTEGER, allowNull: false}
})

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart
