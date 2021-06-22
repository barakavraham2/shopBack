const express = require('express')
const joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
// localhost:3000/auth

router.post('/login', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) res.status(400).send('invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (validPassword == false) res.status(400).send('invalid email or password');

    const token = jwt.sign({ id: user.id, email: user.email, name: user.firstName, role: user.role }, config.get('jwtPrivateKey'))
    res
        .header('access-control-expose-headers', 'x-auth-token')
        .header('x-auth-token', token)
        .status(200).send('loggedin')


})


function validateUser(user) {
    const schema = joi.object({
        password: joi.string().min(5).max(20).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    });
    const validation = schema.validate(user);
    return validation;
}


module.exports = router;