const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, 
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    available: { type: DataTypes.BOOLEAN, defaultValue: true },
    image: { type: DataTypes.STRING }
});

const Order = sequelize.define('Order', {
    status: { 
        type: DataTypes.ENUM('pendente', 'pago', 'enviado', 'cancelado'), 
        defaultValue: 'pendente' 
    },
    total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 }
});

const OrderItem = sequelize.define('OrderItem', {
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = { sequelize, User, Category, Product, Order, OrderItem };