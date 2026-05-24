const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const { User, PlanoTreino } = require('../models'); 

class RecepcionistaController {
    
    // 1. Cadastrar Aluno
    async cadastrarAluno(req, res) {
    try {
        const {
            nome,
            cpf,
            telefone,
            login,
            senha
        } = req.body;

        const recepcionistaId =
            req.user.id;

        const senhaHash =
            await bcrypt.hash(
                senha,
                10
            );

        const novoAluno =
            await UserRepository.create({
                nome,
                cpf,
                telefone,
                login,
                senha: senhaHash,
                role: 'aluno',
                planoAtivo: false,
                recepcionistaId
            });

        return res
            .status(201)
            .json(novoAluno);

    } catch (error) {
        return res.status(500).json({
            message:
                'Erro ao cadastrar aluno',
            error: error.message
        });
    }
}

    // 2. Listar Todos os Alunos
    async listarAlunos(req, res) {
    try {

        const alunos =
            await User.findAll({
                where: {
                    role: 'aluno'
                }
            });

        return res
            .status(200)
            .json(alunos);

    } catch (error) {

        return res.status(500).json({
            message:
                'Erro ao buscar alunos',
            error: error.message
        });
    }
}

    // 3. Consultar Treinos de um Aluno
    async verTreinoDoAluno(req, res) {
        try {
            const { idAluno } = req.params;

            const alunoComTreino = await User.findByPk(idAluno, {
                attributes: ['id', 'nome', 'planoAtivo'],
                include: {
                    model: PlanoTreino,
                    as: 'treinos' 
                }
            });

            if (!alunoComTreino) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }

            return res.status(200).json(alunoComTreino);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar treino do aluno', error: error.message });
        }
    }

    // 4. Registrar Pagamento de Matrícula
    async registrarPagamento(req, res) {
        try {
            const { idMatricula } = req.params;
            return res.status(200).json({ message: `Pagamento da matrícula ${idMatricula} processado.` });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao registrar pagamento', error: error.message });
        }
    }
}

module.exports = new RecepcionistaController();