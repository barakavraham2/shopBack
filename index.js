const Joi = require('joi');
const express = require('express');
const cors = require('cors')
const path = require('path');
const config = require('config');
const users = require('./routes/users')
const cart = require('./routes/cart')
const product = require('./routes/product')
const category = require('./routes/category')
const authentication = require('./routes/authentication')
const orders = require('./routes/orders')
const db = require('./services/mysql');


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/orders', orders)
app.use('/api/cart', cart)
app.use('/api/users', users)
app.use('/api/products', product)
app.use('/api/category', category)
app.use('/auth', authentication)

if (!(config.get('jwtPrivateKey'))) {
    console.error('Fatal ERROR')
    process.exit(1)
}

db.authenticate()
    .then(() => console.log('conccted'))
    .catch((err) => console.log(err))




const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
