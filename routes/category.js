const express = require('express')
const joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const router = express.Router()
const bcrypt = require('bcrypt')
const Category = require('../models/Category')
// localhost:3000/api/category
router.get('/all', async (req, res) => {
    Category.findAll()
        .then((user) => res.send(user))
        .catch(err => res.send(err))
})

router.get('/findcategory/:id', async (req, res) => {
    Category.findAll({ where: id = req.params })
        .then(user => res.send(user))
        .catch(err => res.send(err))

})




module.exports = router;