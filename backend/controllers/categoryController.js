const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const category = await Category.create({ name, slug });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar categoria' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
        await category.destroy();
        res.json({ message: 'Categoria removida' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar categoria' });
    }
};