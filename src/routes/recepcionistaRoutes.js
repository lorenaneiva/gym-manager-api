const express = require('express');
const router = express.Router();
const recepcionistaController = require('../controllers/recepcionistaController');
const authMiddleware = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

router.use(authMiddleware);

// Rotas focadas apenas em alunos e financeiro
router.post('/alunos', checkRole('recepcionista', 'admin'), recepcionistaController.cadastrarAluno);
router.get('/alunos', checkRole('recepcionista', 'admin'), recepcionistaController.listarAlunos);
router.get('/alunos/:idAluno/treino', checkRole('recepcionista', 'admin'), recepcionistaController.verTreinoDoAluno);

router.put('/matriculas/:idMatricula/pagar', checkRole('recepcionista', 'admin'), recepcionistaController.registrarPagamento);

module.exports = router;