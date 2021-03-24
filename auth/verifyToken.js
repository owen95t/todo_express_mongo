const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('ACCESS DENIED')
    }

    try{
        const verified = jwt.verify(token, secret.secret)
        req.user = verified
        next();
    }catch (e) {
        return res.status(400).send('Invalid Token')
    }
}