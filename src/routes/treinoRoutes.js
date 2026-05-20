const { Router } = require('express');

const TreinoController = require('../controllers/treinoController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.post(
    '/',
    authMiddleware,
    checkRole('instrutor', 'admin'),
    TreinoController.create
);

router.get(
    '/',
    authMiddleware,
    checkRole('instrutor', 'admin'),
    TreinoController.index
);

router.get(
    '/meus-treinos',
    authMiddleware,
    checkRole('aluno'),
    TreinoController.meusTreinos
);

router.get(
    '/:alunoId',
    authMiddleware,
    checkRole('instrutor', 'recepcionista', 'admin'),
    TreinoController.findByAluno
);

router.put(
    '/:id',
    authMiddleware,
    checkRole('instrutor', 'admin'),
    TreinoController.update
);

router.delete(
    '/:id',
    authMiddleware,
    checkRole('instrutor', 'admin'),
    TreinoController.delete
);

module.exports = router;