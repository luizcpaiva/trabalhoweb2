const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const tokenLimpo = token.replace('Bearer ', '');
        
        const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET || 'minha_chave_secreta_super_segura');
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};