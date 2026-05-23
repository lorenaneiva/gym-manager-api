const { User, Plano } = require('../models');

class AlunoRepository {
    async findAlunos() {
        return User.findAll({
            where: {
                role: 'aluno'
            },
            attributes: {
                exclude: ['senha']
            },
            include: [
                {
                    model: Plano,
                    as: 'plano',
                    required: false
                }
            ],
            order: [['nome', 'ASC']]
        });
    }

    async findVisitantes() {
        return User.findAll({
            where: {
                role: 'guest'
            },
            attributes: {
                exclude: ['senha']
            },
            order: [['nome', 'ASC']]
        });
    }

    async findById(id) {
        return User.findByPk(id, {
            attributes: {
                exclude: ['senha']
            },
            include: [
                {
                    model: Plano,
                    as: 'plano',
                    required: false
                }
            ]
        });
    }

    async findByLogin(login) {
        return User.findOne({
            where: { login }
        });
    }

    async create(data) {
        const aluno = await User.create(data);

        return User.findByPk(aluno.id, {
            attributes: {
                exclude: ['senha']
            },
            include: [
                {
                    model: Plano,
                    as: 'plano',
                    required: false
                }
            ]
        });
    }

    async matricular(id, data) {
        await User.update(data, {
            where: { id }
        });

        return this.findById(id);
    }
}

module.exports = new AlunoRepository();