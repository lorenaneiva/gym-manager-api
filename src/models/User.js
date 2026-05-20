const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cpf: {
        type: DataTypes.STRING,
        allowNull: true
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: true
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
        type: DataTypes.ENUM(
            'admin',
            'recepcionista',
            'instrutor',
            'aluno',
            'guest'
        ),
        allowNull: false,
        defaultValue: 'guest'
    },

    planoAtivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    recepcionistaId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: 'usuarios'
});

module.exports = User;