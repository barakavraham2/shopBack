const express = require('express')
const joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Cart = require('../models/Cart')
// localhost:3000/api/users
router.get('/all', async (req, res) => {
    User.findAll()
        .then((user) => res.send(user))
        .catch(err => res.send(err))
})

router.get('/finduser/:id', async (req, res) => {
    User.findAll({ where: id = req.params })
        .then(user => res.send(user))
        .catch(err => res.send(err))

})
router.post('/adduser', async (req, res) => {
    const { error } = validateUser(req.body);
    const salt = await bcrypt.genSalt(10);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ where: { email: req.body.email } })
    if (user) res.status(400).send('user alrdey exsit')
    else {
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: await bcrypt.hash(req.body.password, salt),
            email: req.body.email,
            city: req.body.city,
            street: req.body.street,
            role: 1
        })
            .then(user => {

                const token = jwt.sign({ id: user.id, email: user.email, name: user.firstName, role: user.role }, config.get('jwtPrivateKey'))
                res
                    .header('x-auth-token', token)
                    .header('access-control-expose-headers', 'x-auth-token')
                    .send({ id: user.id })

            })
            .catch(err => res.send(err))
    }
})


function validateUser(user) {
    const schema = joi.object({
        firstName: joi.string().min(2).required(),
        lastName: joi.string().min(2).required(),
        password: joi.string().min(5).max(20).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        city: joi.string().required(),
        street: joi.string().required()

    });
    const validation = schema.validate(user);
    return validation;
}

module.exports = router;