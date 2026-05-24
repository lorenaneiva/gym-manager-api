const { Agendamento } = require('../models');

class AgendamentoRepository {
    async create(data) {
        return Agendamento.create(data);
    }

    async updateStatus(id, status) {
        return Agendamento.update(
            { status },
            { where: { idAgendamento: id } }
        );
    }

    async findAll() {
        return Agendamento.findAll();
    }
}

module.exports = new AgendamentoRepository();