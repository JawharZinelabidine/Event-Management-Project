import React from "react";




const EventListItems = ({ event, users, switchView }) => {


    const user = users.slice().find((user) => {
        return user.id === event.organizer
    })

    const thisEvent = event
    thisEvent.owner = user.name


    return (

        <div className="event-card">
            <img src={thisEvent.imageUrl} alt="no content" onClick={() => { switchView('eventDetails', thisEvent) }} />
            <div className="event-type">Organized by: {thisEvent.owner}</div>
            <div className="event-type">{thisEvent.type}</div>
            <h4>{thisEvent.name}</h4>
            <p>{thisEvent.details.substring(0, 93)}...</p>
            <div className="event-bottom-card">
                <button>Participate</button>
            </div>
        </div>



    )


}


export default EventListItems