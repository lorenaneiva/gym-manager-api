const { Router } = require('express');

const AssinaturaController = require('../controllers/assinaturaController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post(
    '/',
    authMiddleware,
    checkRole('guest', 'aluno'),
    AssinaturaController.store
);

module.exports = router;