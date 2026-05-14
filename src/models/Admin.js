const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'admin'
});

module.exports = Admin;
