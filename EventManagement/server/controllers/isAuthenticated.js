const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = isAuthenticated = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if (token === null) {
        res.status(401).send('No access token')
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (!err) {
                next()
            }
            if (err) {
                console.log(err)
                res.status(403).send(err)
            }
        })
    }
}
