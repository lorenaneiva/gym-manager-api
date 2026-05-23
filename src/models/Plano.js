const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Plano = sequelize.define('Plano', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    duracaoDias: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'planos'
})

module.exports = Plano