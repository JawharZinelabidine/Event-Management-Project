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

    return connection.promise().query('INSERT INTO USERS (name, email, password) VALUES (?,?,?)', [name, email, password])

}




module.exports = {

    getAllEvents, getAllOwners, addUser
}