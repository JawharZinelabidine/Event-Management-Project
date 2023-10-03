import React, { useState } from "react";
import moment from 'moment'
import axios from "axios";

const EventListItems = ({ event, users, switchView, participate, myUser }) => {


    const user = users.slice().find((user) => {
        return user.id === event.organizer
    })

    const thisEvent = event
    thisEvent.owner = user.name



    const [buttonLabel, setButtonLabel] = useState(localStorage.getItem('participate' + thisEvent.id + '-' + myUser.id) || 'Participate');


    const deleteEvent = async (userID, eventID) => {

        try {
            await axios.delete('http://localhost:3000/api/attendees/' + userID + '/' + eventID)

        } catch (error) {
            console.log(error)
        }


    }

    const toggleLabel = () => {
        let newLabel = ''
        if (buttonLabel === 'Participate') {
            newLabel = 'Going!'
            participate(myUser.id, event.id)
        }
        else {
            newLabel = 'Participate'
            deleteEvent(myUser.id, thisEvent.id)
        }
        setButtonLabel(newLabel);
        localStorage.setItem('participate' + thisEvent.id + '-' + myUser.id, newLabel);
    };





    return (
        <>

            <div className="event-card">
                <img src={thisEvent.imageUrl} alt="no content" onClick={() => { switchView('eventDetails', thisEvent) }} />
                <div className="event-type">Organized by: {thisEvent.owner}</div>
                <div className="event-type">{thisEvent.type}</div>
                <div className="event-type">{moment(thisEvent.date).fromNow()}</div>
                <h4 className="event-name" onClick={() => { switchView('eventDetails', thisEvent) }}>{thisEvent.name}</h4>
                <p className="event-description">{thisEvent.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={() => { toggleLabel() }}>{buttonLabel}</button>
                </div>
            </div>
        </>


    )


}


export default EventListItems