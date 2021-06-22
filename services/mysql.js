const { Sequelize } = require('sequelize');
const seq = require('../config/config.json')
module.exports = new Sequelize(seq.development)
