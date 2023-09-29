import { useEffect, useState } from 'react'
import './App.css'
import EventList from './components/EventList'
import axios from 'axios'
import EventDetails from './components/EventDetails.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

function App() {

  const [token, setToken] = useState()
  const [view, setView] = useState('eventList')
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [clickedEvent, setClickedEvent] = useState({})




  useEffect(() => {

    fetchUsers()

  }, [])

  const fetchUsers = async () => {

    try {
      const { data } = await axios.get('http://localhost:3000/api/users')
      setUsers(data)
      fetchEvents()
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

  const switchView = (view, event) => {

    setView(view)
    setClickedEvent(event)

  }

  if (!token) {
    if (view === 'signup') return <Signup switchView={switchView} />
    else return <Login setToken={setToken} switchView={switchView} />
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
              <li>Create Event</li>
              <li>Upcoming Events</li>
              <li>My Events</li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="home">
        {view === 'eventDetails' && <EventDetails clickedEvent={clickedEvent} />}

      </section>
      <div >
        {view === 'eventList' && <EventList events={events} users={users} switchView={switchView} />}

      </div>

    </>
  )
}

export default App
