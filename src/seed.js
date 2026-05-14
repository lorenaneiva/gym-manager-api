require('dotenv').config();

const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const { User } = require('./models');

async function seed() {
    try {
        await sequelize.sync({ force: true });

        const password = await bcrypt.hash('123456', 10);

        await User.bulkCreate([
            {
                nome: 'Administrador',
                login: 'admin',
                senha: password,
                role: 'admin'
            },
            {
                nome: 'Recepcionista',
                login: 'recepcionista',
                senha: password,
                role: 'recepcionista'
            },
            {
                nome: 'Instrutor',
                login: 'instrutor',
                senha: password,
                role: 'instrutor'
            },
            {
                nome: 'Aluno',
                login: 'aluno',
                senha: password,
                role: 'aluno'
            },
            {
                nome: 'Visitante',
                login: 'guest',
                senha: password,
                role: 'guest'
            }
        ]);

        console.log('Seed executed successfully');
        process.exit();
    } catch (error) {
        console.error('Error running seed:', error);
        process.exit(1);
    }
}

seed();