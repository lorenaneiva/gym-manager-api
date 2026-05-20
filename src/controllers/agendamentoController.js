const AgendamentoRepository = require('../repositories/AgendamentoRepository');

class AgendamentoController {
    async criar(req, res) {
        try {
            const { alunoId, dataHora, tipoAula } = req.body;

            // Se for aluno ('aluno'), usa o ID do próprio token. Se for recepcionista/admin, usa o do body.
            const idDoAluno = req.user.role === 'aluno' ? req.user.id : alunoId;

            if (!idDoAluno) {
                return res.status(400).json({ message: 'ID do aluno é obrigatório.' });
            }

            const novoAgendamento = await AgendamentoRepository.create({
                alunoId: idDoAluno,
                dataHora,
                tipoAula,
                status: req.user.role === 'aluno' ? 'Pendente' : 'Confirmado'
            });

            return res.status(201).json(novoAgendamento);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar agendamento', error: error.message });
        }
    }

    async atualizarStatus(req, res) {
        try {
            const { idAgendamento } = req.params;
            const { status } = req.body;

            const atualizado = await AgendamentoRepository.updateStatus(idAgendamento, status);
            
            if (!atualizado[0]) {
                return res.status(404).json({ message: 'Agendamento não encontrado.' });
            }

            return res.status(200).json({ message: `Agendamento ${idAgendamento} atualizado para: ${status}` });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar status', error: error.message });
        }
    }

    async listarTodos(req, res) {
        try {
            const agendamentos = await AgendamentoRepository.findAll();
            return res.status(200).json(agendamentos);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar agendamentos', error: error.message });
        }
    }
}

module.exports = new AgendamentoController();