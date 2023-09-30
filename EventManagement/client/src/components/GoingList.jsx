import React from "react";
import moment from "moment";

const GoingList = ({ event, myUser, remove, switchView }) => {




    return (

        <>

            <div className="event-card">
                <img src={event.imageUrl} alt="no content" onClick={() => { switchView('eventDetails', event) }} />
                <div className="event-type">Organized by: {event.name}</div>
                <div className="event-type">{event.type}</div>
                <div className="event-type">{moment(event.date).fromNow()}</div>
                <h4 className="event-name" onClick={() => { switchView('eventDetails', thisEvent) }} >{event.name}</h4>
                <p className="event-description">{event.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={() => { remove(myUser.id, event.events_id); }}>Remove</button>
                </div>
            </div>
        </>


    )


}


export default GoingList