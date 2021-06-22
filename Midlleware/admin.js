const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function admin(req, res, next) {
    const token = req.header('x-auth-token')
    if (req.user.role !== 2) {
        return res.status(403).send('ACSSES FORBIDDEN. NOT AN ADMIN.')
    }
    next();

}

