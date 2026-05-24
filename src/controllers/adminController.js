const UserRepository = require('../repositories/UserRepository');

class AdminController {
    async listarUsuarios(req, res) {
        try {
            const usuarios = await UserRepository.findAll();
            return res.json({
                data: usuarios
            });
        } catch (erro) {
            return res.status(500).json({
                message: 'Erro ao listar usuários'
            });
        }
    }

    async criarUsuario(req, res) {
        try {
            const { nome, login, senha, role } = req.body;

            if (!nome || !login || !senha) {
                return res.status(400).json({
                    message: 'Nome, login e senha são obrigatórios'
                });
            }

            const usuarioJaExiste = await UserRepository.findByLogin(login);
            if (usuarioJaExiste) {
                return res.status(400).json({
                    message: 'Login já cadastrado'
                });
            }

            const bcrypt = require('bcrypt');
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await UserRepository.create({
                nome,
                login,
                senha: senhaCriptografada,
                role: role || 'guest'
            });

            return res.status(201).json({
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    login: usuario.login,
                    role: usuario.role
                }
            });
        } catch (erro) {
            return res.status(500).json({
                message: 'Erro ao criar usuário'
            });
        }
    }

    async listarRelatorios(req, res) {
        try {
            const usuarios = await UserRepository.findAll();

            return res.json({
                data: {
                    totalUsuarios: usuarios.length,
                    usuarios
                }
            });
        } catch (erro) {
            return res.status(500).json({
                message: 'Erro ao gerar relatório'
            });
        }
    }
}

module.exports = new AdminController();