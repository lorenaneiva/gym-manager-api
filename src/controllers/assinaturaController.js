const jwt = require('jsonwebtoken');
const AssinaturaRepository = require('../repositories/AssinaturaRepository');

class AssinaturaController {
    async store(req, res) {
        try {
            const userId = req.user.id;
            const { planoId } = req.body;

            if (!planoId) {
                return res.status(400).json({
                    message: 'Plano é obrigatório'
                });
            }

            const plano = await AssinaturaRepository.findPlanoById(planoId);

            if (!plano) {
                return res.status(404).json({
                    message: 'Plano não encontrado'
                });
            }

            if (!plano.ativo) {
                return res.status(400).json({
                    message: 'Plano inativo'
                });
            }

            const user = await AssinaturaRepository.findUserById(userId);

            if (!user) {
                return res.status(404).json({
                    message: 'Usuário não encontrado'
                });
            }

            if (!['guest', 'aluno'].includes(user.role)) {
                return res.status(403).json({
                    message: 'Funcionários não podem assinar planos'
                });
            }

            const usuarioAtualizado = await AssinaturaRepository.assinarPlano(userId, planoId);

            const token = jwt.sign(
                {
                    id: usuarioAtualizado.id,
                    nome: usuarioAtualizado.nome,
                    login: usuarioAtualizado.login,
                    role: usuarioAtualizado.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.status(201).json({
                data: {
                    token,
                    user: usuarioAtualizado,
                    plano
                }
            });
        } catch (error) {
            console.error('Erro ao assinar plano:', error);

            return res.status(500).json({
                message: 'Erro ao assinar plano'
            });
        }
    }
}

module.exports = new AssinaturaController();