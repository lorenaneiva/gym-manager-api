const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Treino = sequelize.define('Treino', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    alunoid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instrutorid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'treinos'
});

module.exports = Treino;