const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'Email já cadastrado' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Email ou senha incorretos' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: 'Email ou senha incorretos' });

        const token = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin, name: user.username },
            process.env.JWT_SECRET || 'minha_chave_secreta_super_segura',
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar perfil' });
    }
};