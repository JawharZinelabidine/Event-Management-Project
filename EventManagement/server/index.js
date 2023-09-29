const express = require('express')
const cors = require('cors')
const { getAllEvents, getAllOwners, addUser } = require('./database/')


const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/api/events', async (req, res) => {

    try {
        const [results] = await getAllEvents()
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

})

app.get('/api/users', async (req, res) => {

    try {
        const [results] = await getAllOwners()
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

})


app.post('/api/users', async (req, res) => {
    const { name, password, email } = req.body
    console.log(req.body)
    try {
        const [results] = await addUser(name, email, password)
        res.status(201).json(results)
        console.log(results)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

})



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})