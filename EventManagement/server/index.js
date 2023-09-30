const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getAllEvents, getAllOwners, addUser, getUserByEmail, addEvent, createAttendees, getAttendee, removeAttendee, updateEvent, removeEvent } = require('./database/')


const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const JWT_SECRET = "d;lagmdsfklbmado[gqewr=t0i23482151345198498{}[]<>>:D:WQ{EKGD>S:C<OE+fek=wro0'"


app.get('/api/events', async (req, res) => {

    try {
        const [results] = await getAllEvents()
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

})

app.post('/api/events', async (req, res) => {
    const { name, date, organizer, type, imageUrl, details, location } = req.body
    try {
        const [result] = await addEvent(name, date, organizer, type, imageUrl, details, location)
        res.status(201).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json
    }

})


app.put('/api/events/:id', async (req, res) => {
    const { name, date, organizer, type, imageUrl, details, location } = req.body
    const { id } = req.params
    try {
        const [result] = await updateEvent(name, date, organizer, type, imageUrl, details, location, id)
        res.status(201).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json

    }

})


app.delete('/api/events/:id', async (req, res) => {
    const id = req.params.id
    try {
        const [result] = await removeEvent(id)
        res.status(204).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json

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
    const encryptedPassword = await bcrypt.hash(password, 10)
    try {

        const [results] = await addUser(name, encryptedPassword, email)
        res.status(201).json(results)

    } catch (error) {
        console.log(error)
        if (error.errno === 1062) {
            res.status(403).send(error)
        }
        res.status(500).send(error)

    }

})


app.post('/api/users-login', async (req, res) => {

    const { email, password } = req.body

    try {
        const [user] = await getUserByEmail(email)

        if (!user.length) {

            res.status(404).send('Email not found')
        }
        const result = await bcrypt.compare(password, user[0].password)
        const token = jwt.sign({}, JWT_SECRET)
        if (result) {
            res.status(200).json({ data: token, user: user[0] })
        }
        else res.status(401).send('Invalid password')


    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)


    }


})

app.get('/api/attendees/:id', async (req, res) => {

    const { id } = req.params
    try {
        const [result] = await getAttendee(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)

    }
})

app.delete('/api/attendees/:userID/:eventID', async (req, res) => {

    const { userID, eventID } = req.params
    try {
        const [result] = await removeAttendee(userID, eventID)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)

    }
})


app.post('/api/attendees', async (req, res) => {

    const { users_id, events_id } = req.body
    try {
        const [result] = await createAttendees(users_id, events_id)
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)

    }

})



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})