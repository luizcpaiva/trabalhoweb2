module.exports = function (req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado. Área restrita para administradores.' });
    }
};