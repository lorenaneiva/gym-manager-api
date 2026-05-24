const { Treino, User } = require("../models");

class TreinoRepository {
    async create(data) {
        return Treino.create(data);
    }

    async findAll() {
        return Treino.findAll({
            include: [
                { model: User, as: 'aluno', attributes: ['id', 'nome', 'login'] },
                { model: User, as: 'instrutor', attributes: ['id', 'nome'] }
            ]
        });
    }

    async findById(id) {
        return Treino.findByPk(id, {
            include: [
                { model: User, as: 'aluno', attributes: ['id', 'nome', 'login'] },
                { model: User, as: 'instrutor', attributes: ['id', 'nome'] }
            ]
        });
    }

    async findByAlunoId(alunoId) {
        return Treino.findAll({
            where: { alunoId },
            include: [
                { model: User, as: 'instrutor', attributes: ['id', 'nome'] }
            ]
        });
    }

    async update(id, data) {
        return Treino.update(data, {
            where: { id }
        });
    }

    async delete(id) {
        return Treino.destroy({
            where: { id }
        });
    }
}

module.exports = new TreinoRepository();
