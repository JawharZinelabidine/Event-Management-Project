const { Users } = require("../database")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "d;lagmdsfklbmado[gqewr=t0i23482151345198498{}[]<>>:D:WQ{EKGD>S:C<OE+fek=wro0'"



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
    verifyUser: async (req, res) => {
        const { email, password } = req.body
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
            const token = jwt.sign({}, JWT_SECRET)
            if (result) {
                res.status(200).json({ data: token, user: user[0] })
            }
            else res.status(401).send('Invalid password')

        } catch (error) {
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


