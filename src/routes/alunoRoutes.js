const { Router } = require('express');

const AlunoController = require('../controllers/alunoController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.get(
    '/',
    authMiddleware,
    checkRole('admin', 'recepcionista', 'instrutor'),
    AlunoController.index
);

router.get(
    '/visitantes',
    authMiddleware,
    checkRole('admin', 'recepcionista'),
    AlunoController.visitantes
);

router.get(
    '/:id',
    authMiddleware,
    checkRole('admin', 'recepcionista', 'instrutor', 'aluno'),
    AlunoController.show
);

router.post(
    '/',
    authMiddleware,
    checkRole('admin', 'recepcionista'),
    AlunoController.store
);

router.patch(
    '/:id/matricular',
    authMiddleware,
    checkRole('admin', 'recepcionista'),
    AlunoController.matricular
);

module.exports = router;