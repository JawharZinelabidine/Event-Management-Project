import React from "react";
import moment from "moment";

const GoingList = ({ event, myUser, remove, switchView, users, events }) => {


    const user = users.slice().find((user) => {
        return user.id === event.organizer
    })

    const thisEvent = event
    thisEvent.owner = user.name


    const theEvent = events.slice().find((event) => {

        return event.name === thisEvent.name
    })


    return (

        <>

            <div className="event-card">
                <img src={thisEvent.imageUrl} alt="no content" onClick={() => { switchView('eventDetails', theEvent); console.log(theEvent) }} />
                <div className="event-type">Organized by: {thisEvent.owner}</div>
                <div className="event-type">{thisEvent.type}</div>
                <div className="event-type">{moment(thisEvent.date).fromNow()}</div>
                <h4 className="event-name" onClick={() => { switchView('eventDetails', thisEvent) }} >{thisEvent.name}</h4>
                <p className="event-description">{thisEvent.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={() => { remove(myUser.id, event.events_id); }}>Remove</button>
                </div>
            </div>
        </>


    )


}


export default GoingList