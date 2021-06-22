const express = require('express')
const joi = require('joi')
const config = require('config')
const router = express.Router()
const auth = require('../Midlleware/auth')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
// localhost:3002/api/orders/

router.get('/all', async (req, res) => {
    Order.findAll()
        .then((user) => res.send(user))
        .catch(err => res.send(err))
})

router.get('/myOrders', auth, async (req, res) => {
    Order.findAll({ where: { userId: req.user.id } })
        .then(orders => res.send(orders))
        .catch(err => res.send(err))

})
router.post('/set/order', auth, async (req, res) => {
    console.log(req.body)
    const { error } = validateOrder(req.body);
    console.log(error)
    if (error) return res.status(400).send(error.details[0].message)

    Order.create({
        userId: req.body.userId,
        cartId: req.body.cartId,
        quantity: req.body.quantity,
        TotalPrice: req.body.TotalPrice,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        country: req.body.country,
        CreatedAt: req.body.CreatedAt,
        DeliveryDate: req.body.DeliveryDate,
        Payment: req.body.Payment,
    })
        .then(order => {
            res.send('mamamam')
            console.log(res)
        })
        .catch(err => console.log(err))
}
)


function validateOrder(order) {
    const schema = joi.object({
        userId: joi.number().required(),
        cartId: joi.number().required(),
        quantity: joi.number().required(),
        TotalPrice: joi.number().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        houseNumber: joi.number().required(),
        CreatedAt: joi.date().required(),
        DeliveryDate: joi.date().required(),
        Payment: joi.number().required(),
        firstName: joi.string().required(),
        lastName: joi.string()
    })

    const validation = schema.validate(order);
    return validation;
}

module.exports = router;


