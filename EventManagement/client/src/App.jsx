import { useEffect, useState } from 'react'
import './App.css'
import EventList from './components/EventList'
import axios from 'axios'
import EventDetails from './components/EventDetails.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import CreateEvent from './components/CreateEvent.jsx'
import Going from './components/Going.jsx'
import Hosting from './components/Hosting.jsx'
import UpdateEvent from './components/UpdateEvent.jsx'

function App() {

  const [token, setToken] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [view, setView] = useState('eventList')
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [clickedEvent, setClickedEvent] = useState({})



  const createToken = (userToken, user) => {
    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken))
      localStorage.setItem('user', JSON.stringify(user))
      getToken()
    }
  }

  const getToken = () => {
    const token = localStorage.getItem('token')
    const users = localStorage.getItem('user')
    if (token) {
      const userToken = JSON.parse(token)
      const user = JSON.parse(users)
      setToken(userToken)
      setCurrentUser(user)
    }
  }



  const fetchUsers = async () => {

    try {
      const { data } = await axios.get('http://localhost:3000/api/users')
      setUsers(data)
      fetchEvents()
      console.log(events)
    } catch (error) {
      console.log(error)

    }

  }



  const fetchEvents = async () => {

    try {
      const { data } = await axios.get('http://localhost:3000/api/events')
      setEvents(data)
    } catch (error) {
      console.log(error)

    }

  }


  const createEvent = async (event) => {

    try {
      const { data } = await axios.post('http://localhost:3000/api/events', event)
      console.log(data)
      fetchUsers()
    } catch (error) {
      console.log(error)

    }

  }

  const updateEvent = async (event, id) => {

    try {
      const { data } = await axios.put('http://localhost:3000/api/events/' + id, event)
      console.log(data)
      fetchUsers()
    } catch (error) {
      console.log(error)

    }

  }

  const removeEvent = async (id) => {

    try {
      await axios.delete('http://localhost:3000/api/events/' + id)
      fetchUsers()
    } catch (error) {
      console.log(error)

    }

  }





  const participate = async (attendee) => {

    try {
      await axios.post('http://localhost:3000/api/attendees', attendee)

    } catch (error) {
      console.log(error)

    }

  }


  useEffect(() => {

    fetchUsers()

  }, [])

  const switchView = (view, event) => {

    setView(view)
    setClickedEvent(event)

  }

  const emptyLocalStorge = () => {

    for (let key in localStorage) {
      if (key === 'token' || key === 'user') {
        localStorage.removeItem(key)
      }
    }
  }



  if (!token) {
    getToken()
    if (view === 'signup') return <Signup switchView={switchView} />
    else return <Login setTokenAndUser={createToken} switchView={switchView} />
  }



  return (
    <>

      <nav className="nav">
        <div className="container">
          <div className="logo">
            <h1 onClick={() => { switchView('eventList') }}>Eventify</h1>
          </div>
          <div id="mainListDiv" className="main_list">
            <ul className="navlinks">
              <li onClick={() => { switchView('createEvent') }}>Host Event</li>
              <li onClick={() => { switchView('going') }}>Going</li>
              <li onClick={() => { switchView('hosting') }}>Hosting</li>
              <li id='logout' onClick={() => { emptyLocalStorge(); setToken(null) }}>Log out</li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="home">
        {view === 'eventList' && <h1 className='header'>Welcome to the Internet's Best Event Website!</h1>}
        {view === 'going' && <h1 className='header'>Your Upcoming Events!</h1>}
        {view === 'hosting' && <h1 className='header'>Your Events</h1>}
        {view === 'createEvent' && <CreateEvent user={currentUser} add={createEvent} switchView={switchView} />}
        {view === 'updateEvent' && <UpdateEvent clickedEvent={clickedEvent} user={currentUser} switchView={switchView} update={updateEvent} />}
        {view === 'eventDetails' && <EventDetails clickedEvent={clickedEvent} myUser={currentUser} participate={participate} />}

      </section>
      <div className='display'>
        {view === 'eventList' && <EventList events={events} users={users} switchView={switchView} participate={participate} myUser={currentUser} />}
        {view === 'going' && <Going events={events} users={users} switchView={switchView} myUser={currentUser} />}
        {view === 'hosting' && <Hosting events={events} users={users} switchView={switchView} myUser={currentUser} remove={removeEvent} />}


      </div>

    </>
  )
}

export default App
