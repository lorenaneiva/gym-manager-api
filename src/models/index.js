const User = require('./User');
const Admin = require('./Admin');
const AdminLog = require('./AdminLog');
const Agendamento = require('./Agendamento');

// Admin logs
Admin.hasMany(AdminLog, {
    foreignKey: 'adminId'
});

AdminLog.belongsTo(Admin, {
    foreignKey: 'adminId',
    as: 'admin'
});

// Recepcionista -> alunos
User.hasMany(User, {
    foreignKey: 'recepcionistaId',
    as: 'alunosCadastrados'
});

User.belongsTo(User, {
    foreignKey: 'recepcionistaId',
    as: 'cadastradoPor'
});

// aluno -> agendamento
User.hasMany(Agendamento, {
    foreignKey: 'alunoId',
    as: 'agendamentos'
});

Agendamento.belongsTo(User, {
    foreignKey: 'alunoId',
    as: 'aluno'
});

module.exports = {
    User,
    Admin,
    AdminLog,
    Agendamento
};