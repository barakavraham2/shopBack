'use strict';
const sequelize = require('sequelize')
const db = require('../services/mysql')
const { default: CartItem } = require('./CartItem')

const Cart = db.define('carts', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        unique: true
    },
    createdAt: {
        type: sequelize.DATE
    },
    status: {
        type: sequelize.BOOLEAN
    }
}, {
    freezeTableName: true,
    tableName: 'carts',
    timestamps: false
}, {
    associate: (models) => {
        Cart.hasMany(models.CartItem, { foreignKey: cartId })

    }

})


module.exports = Cart
