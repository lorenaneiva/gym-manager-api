const { Router } = require('express')

const PlanoController = require('../controllers/PlanoController')
const authMiddleware = require('../middlewares/auth')
const checkRole = require('../middlewares/checkRole')

const router = Router()

router.get('/', PlanoController.index)

router.get(
    '/admin/todos',
    authMiddleware,
    checkRole('admin'),
    PlanoController.adminIndex
)

router.get('/:id', PlanoController.show)

router.post(
    '/',
    authMiddleware,
    checkRole('admin'),
    PlanoController.store
)

router.put(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    PlanoController.update
)

router.delete(
    '/:id',
    authMiddleware,
    checkRole('admin'),
    PlanoController.delete
)

module.exports = router