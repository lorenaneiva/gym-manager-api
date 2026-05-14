const { Router } = require('express');

const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = Router();

router.get(
    '/',
    authMiddleware,
    checkRole('admin'),
    UserController.index
);

router.get(
    '/:id',
    authMiddleware,
    UserController.show
);

router.patch(
    '/:id/role',
    authMiddleware,
    checkRole('recepcionista', 'admin'),
    UserController.updateRole
);

module.exports = router;