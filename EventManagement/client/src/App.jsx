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
import Search from './components/Search.jsx'

function App() {

  const [token, setToken] = useState()
  const [currentUser, setCurrentUser] = useState({ auth: false, user: {} })
  const [view, setView] = useState('eventList')
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [clickedEvent, setClickedEvent] = useState({})
  const [name, setName] = useState('')


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
      setCurrentUser({ ...currentUser, auth: true, user: user })
    }
  }

  const fetchUsers = async () => {

    try {
      const { data } = await axios.get('http://localhost:3000/api/users')
      axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
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
      axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
      setEvents(data)
    } catch (error) {
      console.log(error)
      emptyLocalStorge()
      setToken(null)

    }

  }

  const createEvent = async (event) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', event.name);
      formDataToSend.append('type', event.type);
      formDataToSend.append('date', event.date);
      formDataToSend.append('description', event.description);
      formDataToSend.append('image', event.imageUrl);
      formDataToSend.append('details', event.details);
      formDataToSend.append('location', event.location);
      formDataToSend.append('organizer', event.organizer);
      const { data } = await axios.post('http://localhost:3000/api/events', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event created:', data);
    } catch (error) {
      console.error('Error creating event:', error);
    }

  }

  const updateEvent = async (event, id) => {

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', event.name);
      formDataToSend.append('type', event.type);
      formDataToSend.append('date', event.date);
      formDataToSend.append('description', event.description);
      formDataToSend.append('image', event.imageUrl);
      formDataToSend.append('details', event.details);
      formDataToSend.append('location', event.location);
      formDataToSend.append('organizer', event.organizer);
      const { data } = await axios.put('http://localhost:3000/api/events/' + id, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event created:', data);
    } catch (error) {
      console.error('Error creating event:', error);
    }

  }

  const removeEvent = async (id) => {

    try {
      await axios.delete('http://localhost:3000/api/events/' + id)
      fetchUsers()
      for (let i = 0; i < attendees.length; i++) {
        if (+attendees[i].split('-')[1] === id) {
          localStorage.removeItem(attendees[i])
        }
      }
    } catch (error) {
      console.log(error)


    }

  }

  const participate = async (users_ID, events_ID) => {

    try {
      await axios.post('http://localhost:3000/api/attendees/' + users_ID + '/' + events_ID)

    } catch (error) {
      console.log(error)

    }

  }

  useEffect(() => {

    fetchUsers()
    fetchEvents()

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
            <h1 onClick={() => { switchView('eventList'); fetchEvents(); setName('') }}>Eventify</h1>
          </div>
          <div id="mainListDiv" className="main_list">
            <ul className="navlinks">
              <li onClick={() => { switchView('createEvent'); fetchEvents() }}>Host Event</li>
              <li onClick={() => { switchView('going'); fetchEvents() }}>Going</li>
              <li onClick={() => { switchView('hosting'); fetchEvents() }}>Hosting</li>
              <li id='logout' onClick={() => { emptyLocalStorge(); setToken(null) }}>Log out</li>

            </ul>
          </div>
        </div>
      </nav>
      <section className="home">
        {view === 'eventList' && <Search filter={setName} />}
        {view === 'eventList' && <h1 className='header'>Welcome to the Internet's Best Event Website!</h1>}
        {view === 'going' && <h1 className='header'>Your Upcoming Events!</h1>}
        {view === 'hosting' && <h1 className='header'>Your Events</h1>}
        {view === 'createEvent' && <CreateEvent user={currentUser} add={createEvent} switchView={switchView} fetchEvents={fetchEvents} />}
        {view === 'eventDetails' && <EventDetails clickedEvent={clickedEvent} myUser={currentUser} participate={participate} fetchEvents={fetchEvents} />}

      </section>
      <div className='display'>
        {view === 'eventList' && <EventList events={events} users={users} switchView={switchView} participate={participate} myUser={currentUser} fetchEvents={fetchEvents} name={name} />}
        {view === 'going' && <Going events={events} users={users} switchView={switchView} myUser={currentUser} />}
        {view === 'hosting' && <Hosting clickedEvent={clickedEvent} events={events} users={users} switchView={switchView} myUser={currentUser} remove={removeEvent} update={updateEvent} />}

      </div>

    </>
  )
}

export default App
