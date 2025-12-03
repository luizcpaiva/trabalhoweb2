const { sequelize, User, Category, Product } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco limpo e sincronizado!');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt); 

        await User.create({
            username: 'admin',
            email: 'admin@loja.com',
            password: hashedPassword,
            isAdmin: true
        });
        console.log('Usuário Admin criado (senha: 123456)');

        const catMaquiagem = await Category.create({ name: 'Maquiagem', slug: 'maquiagem' });
        const catCabelo = await Category.create({ name: 'Cabelo', slug: 'cabelo' });
        const catPerfume = await Category.create({ name: 'Perfumaria', slug: 'perfumaria' });

        await Product.bulkCreate([
            {
                name: 'Batom Vermelho Vibrante',
                description: 'Um batom de longa duração com cor intensa.',
                price: 49.90,
                stock: 100,
                available: true,
                image: '/images/batom.jpg',
                CategoryId: catMaquiagem.id 
            },
            {
                name: 'Base Matte',
                description: 'Base de alta cobertura para todos os tons de pele.',
                price: 89.90,
                stock: 50,
                available: true,
                image: '/images/base.jpg',
                CategoryId: catMaquiagem.id
            },
            {
                name: 'Shampoo Reparador',
                description: 'Para cabelos danificados e quimicamente tratados.',
                price: 35.00,
                stock: 200,
                available: true,
                image: '/images/shampoo.jpg',
                CategoryId: catCabelo.id
            },
            {
                name: 'Perfume Floral',
                description: 'Fragrância leve e delicada para o dia a dia.',
                price: 150.00,
                stock: 20,
                available: true,
                image: '/images/perfume.jpg',
                CategoryId: catPerfume.id
            }
        ]);

        console.log('Produtos e Categorias criados com sucesso!');
        process.exit();

    } catch (error) {
        console.error('Erro ao rodar seed:', error);
        process.exit(1);
    }
}

seed();