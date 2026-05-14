const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
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

    role: {
        type: DataTypes.ENUM('admin', 'recepcionista', 'instrutor', 'aluno', 'guest'),
        allowNull: false,
        defaultValue: 'guest'
    }
}, {
    tableName: 'usuarios'
});

module.exports = User;