const { Order, OrderItem, Product } = require('../models');
const { Op } = require('sequelize');

exports.getCart = async (req, res) => {
    try {
        const cart = await Order.findOne({
            where: { UserId: req.user.id, status: 'pendente' },
            include: [
                {
                    model: OrderItem,
                    include: [Product] 
                }
            ]
        });

        if (!cart) return res.json({ items: [] }); 

        const items = cart.OrderItems.map(item => ({
            id: item.id,
            productId: item.ProductId,
            name: item.Product.name,
            price: item.price,
            quantity: item.quantity,
            image: item.Product.image,
            total: (item.price * item.quantity).toFixed(2)
        }));

        res.json({ id: cart.id, items, total: cart.total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar carrinho' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

        let [cart, created] = await Order.findOrCreate({
            where: { UserId: userId, status: 'pendente' },
            defaults: { total: 0 }
        });

        let orderItem = await OrderItem.findOne({
            where: { OrderId: cart.id, ProductId: productId }
        });

        if (orderItem) {
            orderItem.quantity += (quantity || 1);
            await orderItem.save();
        } else {
            await OrderItem.create({
                OrderId: cart.id,
                ProductId: productId,
                price: product.price,
                quantity: quantity || 1
            });
        }

        res.json({ message: 'Produto adicionado ao carrinho!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar ao carrinho' });
    }
};

exports.checkout = async (req, res) => {
    try {
        const cart = await Order.findOne({
            where: { UserId: req.user.id, status: 'pendente' }
        });

        if (!cart) return res.status(404).json({ message: 'Carrinho vazio' });

        cart.status = 'pago';
        await cart.save();

        res.json({ message: 'Compra realizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao finalizar compra' });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                UserId: req.user.id,
                status: { [Op.ne]: 'pendente' }
            },
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar histórico' });
    }
};