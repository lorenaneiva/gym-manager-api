require('dotenv').config();

const express = require('express');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminLogRoutes = require('./routes/adminLogRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const recepcionistaRoutes = require('./routes/recepcionistaRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Gym manager API rodando com sucesso'
    });
});

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/admin/logs', adminLogRoutes);

// NOVAS ROTAS
app.use('/agendamentos', agendamentoRoutes);
app.use('/recepcionista', recepcionistaRoutes);

module.exports = app;