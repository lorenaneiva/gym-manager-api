const MensalidadeRepository = require('../repositories/MensalidadeRepository');
const AssinaturaRepository = require('../repositories/AssinaturaRepository');

class MensalidadeController {
    async findByAluno(req, res) {
        try {
            const { alunoId } = req.params;

            const isAdmin = req.user.role === 'admin';
            const isRecepcionista = req.user.role === 'recepcionista';
            const isOwner = Number(req.user.id) === Number(alunoId);

            if (!isAdmin && !isRecepcionista && !isOwner) {
                return res.status(403).json({
                    message: 'Acesso negado'
                });
            }

            const mensalidades = await MensalidadeRepository.findByAlunoId(alunoId);

            return res.json({
                data: mensalidades
            });
        } catch (error) {
            console.error('Erro ao buscar mensalidades:', error);

            return res.status(500).json({
                message: 'Erro ao buscar mensalidades'
            });
        }
    }

    async create(req, res) {
        try {
            const { alunoId, planoId, valor, dataVencimento, status } = req.body;

            if (!alunoId || !planoId || valor === undefined || !dataVencimento) {
                return res.status(400).json({
                    message: 'Aluno, plano, valor e vencimento são obrigatórios'
                });
            }

            const aluno = await AssinaturaRepository.findUserById(alunoId);

            if (!aluno) {
                return res.status(404).json({
                    message: 'Aluno não encontrado'
                });
            }

            const plano = await AssinaturaRepository.findPlanoById(planoId);

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                });
            }

            const mensalidade = await MensalidadeRepository.create({
                alunoId,
                planoId,
                valor: Number(valor),
                dataVencimento,
                status: status || 'pendente'
            });

            return res.status(201).json({
                data: mensalidade
            });
        } catch (error) {
            console.error('Erro ao criar mensalidade:', error);

            return res.status(500).json({
                message: 'Erro ao criar mensalidade'
            });
        }
    }

    async pagar(req, res) {
        try {
            const { id } = req.params;

            const mensalidade = await MensalidadeRepository.findById(id);

            if (!mensalidade) {
                return res.status(404).json({
                    message: 'Mensalidade não encontrada'
                });
            }

            const mensalidadeAtualizada = await MensalidadeRepository.updateStatus(id, {
                status: 'paga',
                dataPagamento: new Date().toISOString().slice(0, 10)
            });

            return res.json({
                data: mensalidadeAtualizada
            });
        } catch (error) {
            console.error('Erro ao pagar mensalidade:', error);

            return res.status(500).json({
                message: 'Erro ao pagar mensalidade'
            });
        }
    }
}

module.exports = new MensalidadeController();