const sequelize = require('sequelize')
const db = require('../services/mysql')

const Order = db.define('orders', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize.INTEGER,
        primaryKey: true,
        unique: true
    },
    cartId: {
        type: sequelize.INTEGER
    },
    quantity: {
        type: sequelize.INTEGER

    },
    TotalPrice: {
        type: sequelize.INTEGER,

    },
    country: {
        type: sequelize.STRING,
        allowNull: false

    },
    city: {
        type: sequelize.STRING,
        allowNull: false

    },
    street: {
        type: sequelize.STRING,
        allowNull: false
    },
    houseNumber: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    CreatedAt: {
        type: sequelize.DATE,
        allowNull: false
    },
    DeliveryDate: {
        type: sequelize.DATE,
        allowNull: false
    },
    Payment: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'orders',
    timestamps: false
})

module.exports = Order