const sequelize = require('sequelize')
const db = require('../services/mysql')
const CartItem = require('./CartItem')

const Product = db.define('products', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING
    },
    category: {
        type: sequelize.INTEGER
    },
    price: {
        type: sequelize.INTEGER
    },
    img: {
        type: sequelize.STRING
    },
    description: {
        type: sequelize.STRING
    }
}, {

    associate: (models) => {
        Product.belongsToMany(models.CartItem, { foreignKey: productId })
    }
}
)

module.exports = Product
