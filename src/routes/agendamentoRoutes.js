const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

router.use(authMiddleware);

// Qualquer role autenticada pode tentar criar um agendamento
router.post('/', agendamentoController.criar);

// Apenas a recepção e os admins gerenciam a lista completa e status
router.get('/', checkRole('recepcionista', 'admin'), agendamentoController.listarTodos);
router.patch('/:idAgendamento/status', checkRole('recepcionista', 'admin'), agendamentoController.atualizarStatus);

module.exports = router;