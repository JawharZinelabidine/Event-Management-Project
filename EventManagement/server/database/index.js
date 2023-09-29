const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EventsDB'
})

connection.connect(((err) => {
    if (err) throw err
    else console.log('connected!')
}))

const getAllEvents = () => {

    return connection.promise().query('SELECT * FROM events')

}

const getAllOwners = () => {

    return connection.promise().query('SELECT u.name, u.id FROM users u INNER JOIN events e ON (e.organizer=u.id);')

}

const addUser = (name, password, email) => {

    return connection.promise().query('INSERT INTO users (name, password, email) VALUES (?,?,?)', [name, password, email])

}

const getUserByEmail = (email) => {

    return connection.promise().query('SELECT * FROM users WHERE users.email= "' + email + '" ;')
}

const addEvent = (name, date, organizer, type, imageUrl, details, location) => {

    const values = [name, date, organizer, type, imageUrl, details, location]

    return connection.promise().query('INSERT INTO events (name, date, organizer, type, imageUrl, details, location) VALUES (?,?,?,?,?,?,?)', values)

}

const createAttendees = (userID, eventID) => {

    return connection.promise().query('INSERT INTO attendees (users_id, events_id ) VALUES (?,?)', [userID, eventID])

}


module.exports = {

    getAllEvents, getAllOwners, addUser, getUserByEmail,
    addEvent, createAttendees
}