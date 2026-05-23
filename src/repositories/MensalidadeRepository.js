const { Mensalidade, User, Plano } = require('../models');

class MensalidadeRepository {
    async findByAlunoId(alunoId) {
        return Mensalidade.findAll({
            where: { alunoId },
            include: [
                {
                    model: Plano,
                    as: 'plano'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async findById(id) {
        return Mensalidade.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'aluno',
                    attributes: {
                        exclude: ['senha']
                    }
                },
                {
                    model: Plano,
                    as: 'plano'
                }
            ]
        });
    }

    async create(data) {
        return Mensalidade.create(data);
    }

    async updateStatus(id, data) {
        await Mensalidade.update(data, {
            where: { id }
        });

        return this.findById(id);
    }
}

module.exports = new MensalidadeRepository();