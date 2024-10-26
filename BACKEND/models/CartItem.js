const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const CartItem = sequelize.define('CartItem', {
  cartId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Carts', key: 'id'}, onDelete: 'CASCADE'},
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id'}, onDelete: 'CASCADE'},
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }}, 
)

module.exports = CartItem;