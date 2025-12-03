const { sequelize } = require('./models');

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Banco de dados sincronizado e tabelas criadas!');
    } catch (error) {
        console.error('Erro ao sincronizar banco:', error);
    }
}

syncDatabase();