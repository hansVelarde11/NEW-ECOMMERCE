const {DataTypes} = require('sequelize')
const sequelize=require('../config/database')
const User=require('./User')

const Order=sequelize.define('Order',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    userId:{type:DataTypes.INTEGER,references:{model:User,key:'id'}},
    totalAmount:{type:DataTypes.FLOAT, allowNull:false},
    status:{type:DataTypes.STRING,default:'pendiente'}
})
module.exports=Order