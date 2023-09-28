import { useState } from 'react'
import './App.css'
import EventList from './components/EventList'

function App() {
  const [count, setCount] = useState(0)







  return (
    <>

      <nav className="nav">
        <div className="container">
          <div className="logo">
            <h1>Eventify</h1>
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
      </section>
      <div >

        <EventList />

      </div>

    </>
  )
}

export default App
