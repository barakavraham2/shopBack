const sequelize = require('sequelize')
const db = require('../services/mysql')

const Category = db.define('category', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING
    }
})

module.exports = Category

