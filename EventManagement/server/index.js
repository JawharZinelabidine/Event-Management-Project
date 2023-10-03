const express = require('express')
const usersRouter = require('./routes/users')
const eventsRouter = require('./routes/events')
const attendeesRouter = require('./routes/attendees')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', usersRouter)
app.use('/api', eventsRouter)
app.use('/api', attendeesRouter)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})