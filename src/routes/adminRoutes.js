const { Router } = require('express');
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const roteador = Router();

roteador.get(
    '/usuarios',
    authMiddleware,
    checkRole('admin'),
    AdminController.listarUsuarios
);

roteador.post(
    '/usuarios',
    authMiddleware,
    checkRole('admin'),
    AdminController.criarUsuario
);

roteador.get(
    '/relatorios',
    authMiddleware,
    checkRole('admin'),
    AdminController.listarRelatorios
);

module.exports = roteador;