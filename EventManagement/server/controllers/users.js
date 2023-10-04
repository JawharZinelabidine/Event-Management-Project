const { Users } = require("../database")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    addUser: async (req, res) => {
        const { name, password, email } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10)
        try {
            const user = await Users.create({ name: name, password: encryptedPassword, email: email });
            res.status(201).json(user);
        } catch (error) {
            console.log(error)
            if (error.errno === 1062) {
                res.status(403).send(error)
            }
            res.status(500).send(error)
        }
    },
    verifyToken: (req, res, next) => {
        req.user = { user: null, verified: false }
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1]
            jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, function (err, data) {
                if (!(err && typeof data === 'undefined')) {
                    req.user = { user: data.user, verified: true }
                    next()
                }
                if (err) {
                    console.log(err)
                }
            })
        }
        return res.status(403).send('invalid token')
    },
    login: async (req, res) => {
        const { email, password } = req.body
        let token = null
        try {
            const user = await Users.findAll({
                where: {
                    email: email
                }
            });
            if (!user.length) {
                res.status(404).send('Email not found')
            }
            const result = await bcrypt.compare(password, user[0].password)

            if (result) {

                token = await jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            }
            if (token) {

                res.status(201).json({ token: token, user: user[0] })
            }
            else res.status(401).send('Invalid password')

        } catch (error) {
            console.log(error)
            res.status(500).send("Failed to load resource");
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const user = await Users.findAll();
            res.status(201).json(user);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
};


