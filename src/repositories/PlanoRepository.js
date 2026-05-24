const { Plano } = require('../models')

class PlanoRepository {
    async findAll() {
        return Plano.findAll({
            order: [['valor', 'ASC']]
        })
    }

    async findActive() {
        return Plano.findAll({
            where: {
                ativo: true
            },
            order: [['valor', 'ASC']]
        })
    }

    async findById(id) {
        return Plano.findByPk(id)
    }

    async create(data) {
        return Plano.create(data)
    }

    async update(id, data) {
        await Plano.update(data, {
            where: { id }
        })

        return this.findById(id)
    }

    async delete(id) {
        return Plano.destroy({
            where: { id }
        })
    }
}

module.exports = new PlanoRepository()