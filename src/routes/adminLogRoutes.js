const { Router } = require('express');

const AdminLogController = require('../controllers/adminLogController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = Router();

// so os admin egistrados podem consultar o histórico completo.
router.get(
    '/',
    authMiddleware,
    checkRole('admin'),
    AdminLogController.index
);

// Permite auditar as ações realizadas por um administrador específico.
router.get(
    '/admin/:adminId',
    authMiddleware,
    checkRole('admin'),
    AdminLogController.byAdmin
);

module.exports = router;
