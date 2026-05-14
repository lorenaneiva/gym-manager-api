const User = require('./User');

// Aqui futuramente entram as associações:
// const Treino = require('./Treino');
// const Agendamento = require('./Agendamento');
// const Mensalidade = require('./Mensalidade');
// const Plano = require('./Plano');

// Exemplo futuro:
// User.hasMany(Treino, { foreignKey: 'alunoId' });
// Treino.belongsTo(User, { foreignKey: 'alunoId', as: 'aluno' });

module.exports = {
    User
};