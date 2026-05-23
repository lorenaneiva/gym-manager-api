require('dotenv').config();

const cors = require('cors');
const express = require('express');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminLogRoutes = require('./routes/adminLogRoutes');

const rotasAdmin = require('./routes/adminRoutes');
const treinoRoutes = require('./routes/treinoRoutes');

// SUAS ROTAS
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const recepcionistaRoutes = require('./routes/recepcionistaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Gym manager API rodando com sucesso'
    });
});

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/admin/logs', adminLogRoutes);

// Rotas da dev
app.use('/admin', rotasAdmin);
app.use('/treinos', treinoRoutes);

// Suas rotas
app.use('/agendamentos', agendamentoRoutes);
app.use('/recepcionista', recepcionistaRoutes);

module.exports = app;