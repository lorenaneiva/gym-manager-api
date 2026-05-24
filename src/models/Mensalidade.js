const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mensalidade = sequelize.define('Mensalidade', {
    alunoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    planoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('pendente', 'paga', 'atrasada', 'cancelada'),
        allowNull: false,
        defaultValue: 'pendente'
    },

    dataPagamento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    dataVencimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'mensalidades'
});

module.exports = Mensalidade;