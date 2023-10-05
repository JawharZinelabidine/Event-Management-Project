import React from "react";
import HostingList from "./HostingList.jsx";


const Hosting = ({ events, switchView, myUser, remove, update, clickedEvent }) => {

    const sortedEvents = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date))

    const hostedEvents = sortedEvents.filter((event) => {

        return myUser.user.id === event.organizer
    })

    return (

        <div>
            <div className="event-list">

                {hostedEvents.map((event) => {

                    return <HostingList key={event.id} event={event} switchView={switchView} myUser={myUser} remove={remove} update={update} clickedEvent={clickedEvent} />
                })}

            </div>
        </div>

    )
}


export default Hosting