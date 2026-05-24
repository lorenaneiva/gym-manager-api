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
    series: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    repeticoes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alunoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instrutorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'treinos'
});

module.exports = Treino;