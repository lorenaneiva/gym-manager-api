require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Banco de dados conectado com sucesso');

        await sequelize.sync();
        console.log('Banco de dados conectado com sucesso');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
    }
}

startServer();