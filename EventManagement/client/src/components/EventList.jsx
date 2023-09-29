import React from "react";
import EventListItems from "./EventListItems.jsx";


const EventList = ({ events, users, switchView, participate, myUser }) => {

    const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date))

    return (

        <div>
            <div className="event-list">

                {sortedEvents.map((event) => {

                    return <EventListItems key={event.id} event={event} users={users} switchView={switchView} participate={participate} myUser={myUser} />
                })}

            </div>
        </div>

    )
}


export default EventList