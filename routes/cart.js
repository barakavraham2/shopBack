const express = require('express')
const joi = require('joi')
const auth = require('../Midlleware/auth')
const admin = require('../Midlleware/admin')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Cart = require('../models/Cart')
const db = require('../services/mysql');
const CartItem = require('../models/CartItem')
const { Sequelize, modelManager } = require('../services/mysql')
const Product = require('../models/Product')
const { rawAttributes, sequelize } = require('../models/CartItem')
const { includes } = require('lodash')
const { QueryTypes } = require('sequelize');


// localhost:3002/api/cart/close/mycart
router.get('/all', async (req, res) => {

    Cart.findAll()
        .then((cart) => res.send(cart))
        .catch(err => res.send(err))
})

router.post('/close/mycart', auth, async (req, res) => {
    const cart = await Cart.findOne({
        where: { userID: req.user.id, status: 1 }
    })
    if (cart) {
        cart.status = 2;
        cart.save()
        Cart.create({
            userID: req.user.id,
            createdAt: new Date()
        })
            .then((cart) => res.send(cart))
            .catch(err => res.send(err))
    }
})

router.post('/create/:id', async (req, res) => {
    Cart.create({
        userID: req.params.id,
        createdAt: new Date()
    })
        .then((cart) => res.send(cart))
        .catch(err => res.send(err))
})

router.get('/user/:userID', async (req, res) => {
    Cart.findAll({ where: { userID: req.params.userID, status: 1 } })
        .then(cart => res.status(200).send(cart[0]))
        .catch(err => res.send(err))

})
router.get('/getcart/:cartId', async (req, res) => {

    const resulte = await sequelize.query(`SELECT productId,cartId,quantity,name,img,description,price,TotalPrice FROM cart_item join products  where cart_item.productId = products.id AND cart_item.cartId=${req.params.cartId}`
        , { type: QueryTypes.SELECT })
        .then(cart => res.status(200).send(cart))
        .catch(err => res.send(err))

})
router.post('/additem', [auth], async (req, res) => {
    const cartitem = await CartItem.findOne({
        where: { cartId: req.body.cartId, productId: req.body.productId }
    })
    if (cartitem) {
        cartitem.quantity = cartitem.quantity + 1;
        cartitem.TotalPrice = cartitem.TotalPrice + req.body.productPrice;
        cartitem.save()
        res.status(200).send('qty update')
    }
    else {
        CartItem.create({
            productId: req.body.productId,
            quantity: req.body.quantity,
            TotalPrice: req.body.quantity * req.body.productPrice,
            cartId: req.body.cartId
        }).then((cart) => res.status(200).send(cart))
            .catch(err => res.send(err))
    }
})

router.post('/removeitem', async (req, res) => {
    const cartitem = await CartItem.findOne({
        where: { cartId: req.body.cartId, productId: req.body.productId }
    })
    if (cartitem) {
        if (cartitem.quantity === 1) {
            cartitem.destroy()
            cartitem.save()
            res.status(200).send('item removed from database')
        }
        else {
            cartitem.quantity = cartitem.quantity - 1;
            cartitem.TotalPrice = cartitem.TotalPrice - req.body.productPrice;
            cartitem.save()
            res.status(200).send('qty update')
        }

    }
    else {
        res.status(404).send('no item was found')
    }
})



module.exports = router;