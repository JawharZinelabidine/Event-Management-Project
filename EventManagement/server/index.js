const express = require('express')
const { getAllEvents } = require('./database/')


const app = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/events', async (req, res) => {

    try {
        const [results] = await getAllEvents()
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})