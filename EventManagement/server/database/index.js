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



module.exports = {

    getAllEvents,
}