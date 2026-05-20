const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
    idAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipoAula: {
        type: DataTypes.STRING, // Ex: 'Musculação', 'Crossfit', 'Pilates'
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, // 'Pendente', 'Confirmado', 'Cancelado'
        allowNull: false,
        defaultValue: 'Confirmado'
    },
    alunoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', 
            key: 'id'
        }
    }
});

module.exports = Agendamento;