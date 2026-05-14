const UserRepository = require('../repositories/UserRepository');

class UserController {
    async index(req, res) {
        try {
            const users = await UserRepository.findAll();

            return res.json({
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar usuários'
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const isAdmin = req.user.role === 'admin';
            const isOwner = Number(req.user.id) === Number(id);

            if (!isAdmin && !isOwner) {
                return res.status(403).json({
                    message: 'Acesso negado'
                });
            }

            const user = await UserRepository.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                });
            }

            return res.json({
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao buscar usuário'
            });
        }
    }

    async updateRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const validRoles = ['admin', 'recepcionista', 'instrutor', 'aluno', 'guest'];

            if (!validRoles.includes(role)) {
                return res.status(400).json({
                    message: 'Role inválida'
                });
            }

            await UserRepository.updateRole(id, role);

            const user = await UserRepository.findById(id);

            return res.json({
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar role do usuário'
            });
        }
    }
}

module.exports = new UserController();