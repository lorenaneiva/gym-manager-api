const express = require('express');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Gym manager API rodando com sucesso'
    });
});

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);

module.exports = app;