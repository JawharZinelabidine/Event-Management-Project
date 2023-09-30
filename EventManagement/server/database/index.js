const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EventsDB',
    multipleStatements: true
})

connection.connect(((err) => {
    if (err) throw err
    else console.log('connected!')
}))

const getAllEvents = () => {

    return connection.promise().query('SELECT * FROM events')

}

const addEvent = (name, date, organizer, type, imageUrl, details, location) => {

    const values = [name, date, organizer, type, imageUrl, details, location]

    return connection.promise().query('INSERT INTO events (name, date, organizer, type, imageUrl, details, location) VALUES (?,?,?,?,?,?,?)', values)

}

const updateEvent = (name, date, organizer, type, imageUrl, details, location, id) => {

    const values = [name, date, organizer, type, imageUrl, details, location, id]

    return connection.promise().query('UPDATE events SET name = (?), date = (?), organizer = (?), type = (?), imageUrl = (?), details = (?), location = (?) WHERE events.id = (?)', values)

}

const removeEvent = (id) => {

    return connection.promise().query(' DELETE FROM attendees WHERE attendees.events_id = (?); DELETE FROM events WHERE events.id = (?)', [id, id])

}

const getAllOwners = () => {

    return connection.promise().query('SELECT u.name, u.id FROM users u INNER JOIN events e ON (e.organizer=u.id);')

}

const addUser = (name, password, email) => {

    return connection.promise().query('INSERT INTO users (name, password, email) VALUES (?,?,?)', [name, password, email])

}

const getUserByEmail = (email) => {

    return connection.promise().query('SELECT * FROM users WHERE users.email= (?)', [email])
}


const createAttendees = (userID, eventID) => {

    return connection.promise().query('INSERT INTO attendees (users_id, events_id ) VALUES (?,?)', [userID, eventID])

}

const getAttendee = (userID) => {

    return connection.promise().query('SELECT * , e.name FROM events e INNER JOIN attendees a ON (e.id=a.events_id) INNER JOIN users u ON (a.users_id=u.id) WHERE u.id = (?)', userID)
}


const removeAttendee = (userID, eventID) => {

    return connection.promise().query('DELETE FROM attendees WHERE users_id=(?) AND events_id=(?)', [userID, eventID])

}


module.exports = {

    getAllEvents, getAllOwners, addUser, getUserByEmail,
    addEvent, createAttendees, getAttendee, removeAttendee, updateEvent, removeEvent
}