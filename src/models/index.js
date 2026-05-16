const User = require('./User');
const Admin = require('./Admin');
const AdminLog = require('./AdminLog');

// Aqui futuramente entram as associações:
const Treino = require('./Treino');
// const Agendamento = require('./Agendamento');
// const Mensalidade = require('./Mensalidade');
// const Plano = require('./Plano');

// Exemplo futuro:
// User.hasMany(Treino, { foreignKey: 'alunoId' });
// Treino.belongsTo(User, { foreignKey: 'alunoId', as: 'aluno' });

User.hasMany(Treino, { foreignKey: 'alunoId', as: 'treinosAluno' });
Treino.belongsTo(User, { foreignKey: 'alunoId', as: 'aluno' });

User.hasMany(Treino, { foreignKey: 'instrutorId', as: 'treinosInstrutor' });
Treino.belongsTo(User, { foreignKey: 'instrutorId', as: 'instrutor' });


//um administradosr pode grar varios logs
Admin.hasMany(AdminLog, { foreignKey: 'adminId' });
//cada log pertence ao admin que executou a acao
AdminLog.belongsTo(Admin, { foreignKey: 'adminId', as: 'admin' });

module.exports = {
    User,
    Admin,
    AdminLog,
    Treino
};
