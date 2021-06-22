'usestrict';
const Cart = require('./Cart')
const sequelize = require('sequelize')
const db = require('../services/mysql');
const Product = require('./Product');
const { associate } = require('./Product');

const CartItem = db.define('cart_item', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        unique: true
    },
    quantity: {
        type: sequelize.INTEGER
    },
    TotalPrice: {
        type: sequelize.INTEGER

    },
    cartId: {
        type: sequelize.INTEGER,
        primaryKey: true

    }
}, {
    freezeTableName: true,
    tableName: 'cart_item',
    timestamps: false
},
    {
        associate: (models) => {
            CartItem.hasOne(models.Cart, { foreignKey: cartId })
            CartItem.hasOne(models.Product, { foreignKey: id })
        }

    })

module.exports = CartItem