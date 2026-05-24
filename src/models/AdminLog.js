//'e um historico de acoes do admin para que possa tornar a role dele mais segura e facil de consertar erros e segurança do nosso sistema
//qual admin fez tal regsitro


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdminLog = sequelize.define('AdminLog', {
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    acao: {
        type: DataTypes.STRING,
        allowNull: false
    },
//entidade que foi afetada com a acao
    entidade: {
        type: DataTypes.STRING,
        allowNull: false
    },

    entidadeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    detalhes: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'admin_logs'
});

module.exports = AdminLog;
