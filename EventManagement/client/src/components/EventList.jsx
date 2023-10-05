import React from "react";
import EventListItems from "./EventListItems.jsx";


const EventList = ({ events, users, switchView, participate, myUser, fetchEvents, name }) => {

    const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date))

    const filteredEvents = sortedEvents.slice().filter((event) => {
        if (name) return event.name.toLowerCase().includes(name.toLowerCase())
        else return event
    })

    return (

        <div>
            <div className="event-list">

                {filteredEvents.map((event) => {

                    return <EventListItems key={event.id} event={event} users={users} switchView={switchView} participate={participate} myUser={myUser} fetchEvents={fetchEvents} />
                })}

            </div>
        </div>

    )
}


export default EventList