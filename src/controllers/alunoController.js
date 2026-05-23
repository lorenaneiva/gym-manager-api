const bcrypt = require('bcrypt');

const AlunoRepository = require('../repositories/AlunoRepository');
const AssinaturaRepository = require('../repositories/AssinaturaRepository');

class AlunoController {
    async index(req, res) {
        try {
            const alunos = await AlunoRepository.findAlunos();

            return res.json({
                data: alunos
            });
        } catch (error) {
            console.error('Erro ao listar alunos:', error);

            return res.status(500).json({
                message: 'Erro ao listar alunos'
            });
        }
    }

    async visitantes(req, res) {
        try {
            const visitantes = await AlunoRepository.findVisitantes();

            return res.json({
                data: visitantes
            });
        } catch (error) {
            console.error('Erro ao listar visitantes:', error);

            return res.status(500).json({
                message: 'Erro ao listar visitantes'
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const aluno = await AlunoRepository.findById(id);

            if (!aluno) {
                return res.status(404).json({
                    message: 'Aluno não encontrado'
                });
            }

            const isAdmin = req.user.role === 'admin';
            const isRecepcionista = req.user.role === 'recepcionista';
            const isInstrutor = req.user.role === 'instrutor';
            const isOwner = Number(req.user.id) === Number(id);

            if (!isAdmin && !isRecepcionista && !isInstrutor && !isOwner) {
                return res.status(403).json({
                    message: 'Acesso negado'
                });
            }

            return res.json({
                data: aluno
            });
        } catch (error) {
            console.error('Erro ao buscar aluno:', error);

            return res.status(500).json({
                message: 'Erro ao buscar aluno'
            });
        }
    }

    async store(req, res) {
        try {
            const { nome, login, senha, planoId } = req.body;

            if (!nome || !login || !senha || !planoId) {
                return res.status(400).json({
                    message: 'Nome, login, senha e plano são obrigatórios'
                });
            }

            const usuarioExistente = await AlunoRepository.findByLogin(login);

            if (usuarioExistente) {
                return res.status(400).json({
                    message: 'Login já cadastrado'
                });
            }

            const plano = await AssinaturaRepository.findPlanoById(planoId);

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const aluno = await AlunoRepository.create({
                nome,
                login,
                senha: senhaCriptografada,
                role: 'aluno',
                planoId,
                planoAtivo: true
            });

            return res.status(201).json({
                data: aluno
            });
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);

            return res.status(500).json({
                message: 'Erro ao cadastrar aluno'
            });
        }
    }

    async matricular(req, res) {
        try {
            const { id } = req.params;
            const { nome, login, planoId } = req.body;

            if (!nome || !login || !planoId) {
                return res.status(400).json({
                    message: 'Nome, login e plano são obrigatórios'
                });
            }

            const aluno = await AlunoRepository.findById(id);

            if (!aluno) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                });
            }

            const plano = await AssinaturaRepository.findPlanoById(planoId);

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                });
            }

            const alunoAtualizado = await AlunoRepository.matricular(id, {
                nome,
                login,
                role: 'aluno',
                planoId,
                planoAtivo: true
            });

            return res.json({
                data: alunoAtualizado
            });
        } catch (error) {
            console.error('Erro ao matricular aluno:', error);

            return res.status(500).json({
                message: 'Erro ao matricular aluno'
            });
        }
    }
}

module.exports = new AlunoController();