const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminLogRoutes = require('./routes/adminLogRoutes');
const rotasAdmin = require('./routes/adminRoutes');
const treinoRoutes = require('./routes/treinoRoutes');
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
app.use('/admin', rotasAdmin); 
app.use('/treinos', treinoRoutes);
module.exports = app;