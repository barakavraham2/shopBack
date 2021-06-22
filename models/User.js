const sequelize = require('sequelize')
const db = require('../services/mysql')

const User = db.define('user', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: sequelize.STRING
    },
    lastName: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    city: {
        type: sequelize.STRING
    },
    street: {
        type: sequelize.STRING
    },
    role: {
        type: sequelize.INTEGER
    }
})

module.exports = User

