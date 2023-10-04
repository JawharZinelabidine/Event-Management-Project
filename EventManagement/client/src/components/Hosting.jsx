import React from "react";
import HostingList from "./HostingList.jsx";


const EventList = ({ events, users, switchView, myUser, remove }) => {

    const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date))

    const hostedEvents = sortedEvents.filter((event) => {

        return myUser.user.id === event.organizer
    })

    return (

        <div>
            <div className="event-list">

                {hostedEvents.map((event) => {

                    return <HostingList key={event.id} event={event} switchView={switchView} myUser={myUser} remove={remove} />
                })}

            </div>
        </div>

    )
}


export default EventList