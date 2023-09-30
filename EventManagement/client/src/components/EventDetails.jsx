import React, { useState } from "react";
import moment from "moment"
import axios from "axios";


const EventDetails = ({ clickedEvent, myUser, participate }) => {

    const [buttonLabel, setButtonLabel] = useState(localStorage.getItem('participate' + clickedEvent.id + '-' + myUser.id) || 'Participate');

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
            participate({ users_id: myUser.id, events_id: clickedEvent.id })
        }
        else {
            newLabel = 'Participate'
            deleteEvent(myUser.id, clickedEvent.id)
        }
        setButtonLabel(newLabel);
        localStorage.setItem('participate' + clickedEvent.id + '-' + myUser.id, newLabel);
    };




    return (


        <div className="event-details">
            <img src={clickedEvent.imageUrl} alt="no content" />
            <div className="event-details-content">
                <h4>{clickedEvent.name}</h4>
                <div className="organizer">Organized by: {clickedEvent.owner}</div>
                <div className="organizer">On: {moment(clickedEvent.date).format('MMMM Do YYYY, h:mm a')}</div>
                <div className="type">{clickedEvent.type}</div>


                <p>{clickedEvent.details}</p>
                <div className="button">
                    <button className="participate" onClick={() => { toggleLabel() }} >{buttonLabel}</button>
                </div>

            </div>
        </div>


    )


}

export default EventDetails