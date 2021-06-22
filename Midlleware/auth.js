const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send('ACSSES DENIED. NO TOKEN PROVIEDED.')

    }
    try {
        const decode = jwt.verify(token, config.get('jwtPrivateKey'))
        console.log(decode)
        req.user = decode;
        next();

    }
    catch (ex) {
        return res.status(400).send('INVALID TOKEN.')

    }

}

