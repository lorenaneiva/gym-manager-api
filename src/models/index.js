const User = require('./User');
const Admin = require('./Admin');
const AdminLog = require('./AdminLog');
const Agendamento = require('./Agendamento');
const Treino = require('./Treino');
const Plano = require('./Plano');
const Mensalidade = require('./Mensalidade');

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

// Treinos
User.hasMany(Treino, {
    foreignKey: 'alunoId',
    as: 'treinosAluno'
});

Treino.belongsTo(User, {
    foreignKey: 'alunoId',
    as: 'aluno'
});

User.hasMany(Treino, {
    foreignKey: 'instrutorId',
    as: 'treinosInstrutor'
});

Treino.belongsTo(User, {
    foreignKey: 'instrutorId',
    as: 'instrutor'
});

// Plano do usuário
Plano.hasMany(User, {
    foreignKey: 'planoId',
    as: 'usuarios'
});

User.belongsTo(Plano, {
    foreignKey: 'planoId',
    as: 'plano'
});

// Mensalidades
User.hasMany(Mensalidade, {
    foreignKey: 'alunoId',
    as: 'mensalidades'
});

Mensalidade.belongsTo(User, {
    foreignKey: 'alunoId',
    as: 'aluno'
});

Plano.hasMany(Mensalidade, {
    foreignKey: 'planoId',
    as: 'mensalidades'
});

Mensalidade.belongsTo(Plano, {
    foreignKey: 'planoId',
    as: 'plano'
});

module.exports = {
    User,
    Admin,
    AdminLog,
    Agendamento,
    Treino,
    Plano,
    Mensalidade
};