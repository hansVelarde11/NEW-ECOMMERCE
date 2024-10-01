const {DataTypes} = require('sequelize')
const sequelize=require('../config/database')

const Product = sequelize.define('Product',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type: DataTypes.STRING,allowNull:false},
    description:{type: DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.FLOAT, allowNull:null},
    stock:{type:DataTypes.INTEGER,allowNull:false},
    image:{type:DataTypes.STRING}

})

module.exports=Product