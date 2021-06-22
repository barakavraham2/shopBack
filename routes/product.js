const express = require('express')
const joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const auth = require('../Midlleware/auth')
const admin = require('../Midlleware/admin')
const router = express.Router()
const bcrypt = require('bcrypt')
const { rawAttributes, sequelize } = require('../models/CartItem')
const Product = require('../models/Product')
const { QueryTypes } = require('sequelize');
// localhost:3002/api/product

router.get('/all', async (req, res) => {
    Product.findAll()
        .then((product) => res.send(product))
        .catch(err => res.send(err))
})
router.get('/:id', async (req, res) => {
    Product.findOne({ where: id = req.params })
        .then((product) => res.send(product))
        .catch(err => res.send(err))
})
router.post('/search/product', async (req, res) => {
    const resulte = await sequelize.query(`SELECT * FROM products WHERE name LIKE '%${req.body.keyWord}%'`
        , { type: QueryTypes.SELECT })
        .then(items => res.status(200).send(items))
        .catch(err => res.send(err))

})
router.get('/productsByCategory/:category', async (req, res) => {
    Product.findAll({ where: category = req.params })
        .then(product => res.send(product))
        .catch(err => res.send(err))

})

router.post('/add/product', [auth, admin], async (req, res) => {
    Product.create({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        img: req.body.img,
        description: req.body.description
    })
        .then(product => res.send({
            msg: `item added to category ${category}`,
            item: product
        }))
        .catch(err => res.send(err))

})
router.put('/edit/product/:id', [auth, admin], async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } })
    if (product) {
        product.update({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
            description: req.body.description
        })
        product.save().then(
            res.status(200).send({
                msg: 'PRODUCT UPDATE',
                data: product
            })
        )
    }
    else {
        res.status(404).send({
            msg: 'PRODUCT NOT EXSIT'
        })
    }

})
router.delete('/item/:id', [auth, admin], async (req, res) => {
    Product.destroy({ where: id = req.params })
        .then(x => res.send({
            msg: `item ${id} deleted`
        }))
        .catch(err => res.send(err))

})
module.exports = router;