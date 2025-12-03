const { Product, Category } = require('../models');
const { Op } = require('sequelize'); 

exports.getAllProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        
        let where = { available: true }; 
        let include = [{ model: Category, attributes: ['name', 'slug'] }]; 

        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } }, 
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        if (category) {
            include = [{
                model: Category,
                where: { slug: category }, 
                attributes: ['name', 'slug']
            }];
        }

        const products = await Product.findAll({
            where,
            include
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category, attributes: ['name', 'slug'] }]
        });
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
};