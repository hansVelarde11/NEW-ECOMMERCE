const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: 'cliente' },
    isDeleted: {type: sequelize.BOOLEAN, defaultValue: false},
    resetToken: {type: DataTypes.STRING, allowNull: true},
    resetTokenExpiration: {type: DataTypes.DATE, allowNull: true},

})

module.exports = User