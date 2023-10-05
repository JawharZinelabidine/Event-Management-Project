import React, { useEffect, useState } from "react";
import moment from 'moment'
import axios from "axios";

const EventListItems = ({ event, users, switchView, participate, myUser, fetchEvents }) => {


    const [attendeeNumber, setAttendeeNumber] = useState('Be the first to confirm your attendance!')


    const user = users.slice().find((user) => {
        return user.id === event.organizer
    })

    const thisEvent = event
    thisEvent.owner = user.name



    const [buttonLabel, setButtonLabel] = useState(localStorage.getItem('participate' + thisEvent.id + '-' + myUser.user.id) || 'Participate');


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
            participate(myUser.user.id, event.id)
        }
        else {
            newLabel = 'Participate'
            deleteEvent(myUser.user.id, thisEvent.id)
        }
        setButtonLabel(newLabel);
        localStorage.setItem('participate' + thisEvent.id + '-' + myUser.user.id, newLabel);
    };


    const numberOfAttendees = async () => {
        const { data } = await axios.get('http://localhost:3000/api/attendees-users/' + thisEvent.id)
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

        numberOfAttendees()
    })


    return (
        <>

            <div className="event-card">
                <img src={thisEvent.imageUrl} alt="no content" onClick={() => { switchView('eventDetails', thisEvent) }} />
                <div className="event-type">Organized by: {thisEvent.owner}</div>
                <div className="event-type">{thisEvent.type}</div>
                <div className="event-type">{moment(thisEvent.date).fromNow()}</div>
                <div className="event-type">{attendeeNumber}</div>
                <h4 className="event-name" onClick={() => { switchView('eventDetails', thisEvent) }}>{thisEvent.name}</h4>
                <p className="event-description">{thisEvent.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={() => { toggleLabel(); fetchEvents() }}>{buttonLabel}</button>
                </div>
            </div>
        </>


    )


}


export default EventListItems