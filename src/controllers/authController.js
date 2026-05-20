const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserRepository = require('../repositories/UserRepository');

class AuthController {
    async register(req, res) {
        try {
            const { nome, login, senha } = req.body;

            if (!nome || !login || !senha) {
                return res.status(400).json({
                    message: 'Nome, login e senha são obrigatórios'
                });
            }

            const userAlreadyExists = await UserRepository.findByLogin(login);

            if (userAlreadyExists) {
                return res.status(400).json({
                    message: 'Login já cadastrado'
                });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);

            const user = await UserRepository.create({
                nome,
                login,
                senha: hashedPassword,
                role: 'guest'
            });

            return res.status(201).json({
                data: {
                    id: user.id,
                    nome: user.nome,
                    login: user.login,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao cadastrar usuário'
            });
        }
    }

    async login(req, res) {
        try {
            const { login, senha } = req.body;

            if (!login || !senha) {
                return res.status(400).json({
                    message: 'Login e senha são obrigatórios'
                });
            }

            const user = await UserRepository.findByLogin(login);
            console.log('>>> Usuário encontrado no banco:', user ? user.login : 'Nenhum usuário achado');

            if (!user) {
                return res.status(401).json({
                    message: 'Login ou senha inválidos'
                });
            }

            const passwordIsValid = await bcrypt.compare(senha, user.senha);
            console.log('>>> Senha bateu com o hash:', passwordIsValid);

            if (!passwordIsValid) {
                return res.status(401).json({
                    message: 'Login ou senha inválidos'
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    login: user.login,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            return res.json({
                data: {
                    token,
                    user: {
                        id: user.id,
                        nome: user.nome,
                        login: user.login,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao fazer login: ' + error
            });
        }
    }
}

module.exports = new AuthController();