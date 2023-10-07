import React, { useEffect, useState } from "react";
import moment from "moment"
import axios from "axios";


const EventDetails = ({ clickedEvent, myUser, participate, fetchEvents }) => {

    const [buttonLabel, setButtonLabel] = useState(localStorage.getItem('participate-' + clickedEvent.id + '-' + myUser.user.id) || 'Participate');
    const [attendeeNumber, setAttendeeNumber] = useState('Be the first to confirm your attendance!')


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
            participate(myUser.user.id, clickedEvent.id)
            localStorage.setItem('participate-' + clickedEvent.id + '-' + myUser.user.id, newLabel)
        }
        else {
            newLabel = 'Participate'
            deleteEvent(myUser.user.id, clickedEvent.id)
            localStorage.removeItem('participate-' + clickedEvent.id + '-' + myUser.user.id)

        }
        setButtonLabel(newLabel);
        ;
    };

    const numberOfAttendees = async () => {
        const attendees = Object.keys(localStorage)
        let attendeeCounter = 0
        for (let i = 0; i < attendees.length; i++) {
            if (+attendees[i].split('-')[1] === clickedEvent.id) {
                attendeeCounter++
            }
        }
        if (attendeeCounter > 1) {
            setAttendeeNumber(attendeeCounter + ' people attending!')
        }
        else if (attendeeCounter === 1) {
            setAttendeeNumber(attendeeCounter + ' person attending!')
        }
        else setAttendeeNumber('Be the first to confirm your attendance!')

    }

    useEffect(() => {

        numberOfAttendees()

    })


    return (


        <div className="event-details">
            <img src={clickedEvent.imageUrl} alt="no content" onClick={() => { console.log(buttonLabel) }} />
            <div className="event-details-content">
                <div className="event-location">
                    <h4 >Location: {clickedEvent.location}</h4>
                </div>
                <div className="organizer">Organized by: {clickedEvent.owner}</div>
                <div className="organizer">On: {moment(clickedEvent.date).format('MMMM Do YYYY, h:mm a')}</div>
                <div className="type">{clickedEvent.type}</div>
                <div className="event-type">{attendeeNumber}</div>
                <h4 className="details-name" >{clickedEvent.name}</h4>
                <div className="details-description">
                    <p >{clickedEvent.details}</p>
                </div>
                <div className="button">
                    <button className="participate" onClick={() => { toggleLabel(); fetchEvents() }} >{buttonLabel || 'Participate'}</button>
                </div>

            </div>
        </div>


    )


}

export default EventDetails