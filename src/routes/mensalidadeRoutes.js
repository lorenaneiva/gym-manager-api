const { Router } = require('express');

const MensalidadeController = require('../controllers/mensalidadeController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.get(
    '/:alunoId',
    authMiddleware,
    checkRole('aluno', 'admin', 'recepcionista'),
    MensalidadeController.findByAluno
);

router.post(
    '/',
    authMiddleware,
    checkRole('recepcionista', 'admin'),
    MensalidadeController.create
);

router.patch(
    '/:id/pagar',
    authMiddleware,
    checkRole('recepcionista', 'admin'),
    MensalidadeController.pagar
);

module.exports = router;