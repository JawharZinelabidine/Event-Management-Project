import React, { useEffect, useState } from "react";
import moment from "moment"
import axios from "axios";


const EventDetails = ({ clickedEvent, myUser, participate, fetchEvents }) => {

    const [buttonLabel, setButtonLabel] = useState(localStorage.getItem('participate' + clickedEvent.id + '-' + myUser.user.id));
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
        }
        else {
            newLabel = 'Participate'
            deleteEvent(myUser.user.id, clickedEvent.id)
        }
        setButtonLabel(newLabel);
        localStorage.setItem('participate' + clickedEvent.id + '-' + myUser.user.id, newLabel);
    };

    const numberOfAttendees = async () => {
        const { data } = await axios.get('http://localhost:3000/api/attendees-users/' + clickedEvent.id)
        const attendeesCount = data.length
        if (attendeesCount > 1) {
            setAttendeeNumber(attendeesCount + ' people attending!')
        }
        else if (attendeesCount === 1) {
            setAttendeeNumber(attendeesCount + ' person attending!')
        }
        else setAttendeeNumber('Be the first to confirm your attendance!')

    }

    useEffect(() => {

        setButtonLabel(localStorage.getItem('participate' + clickedEvent.id + '-' + myUser.user.id))
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