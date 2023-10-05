import React, { useState, useEffect } from "react";
import moment from 'moment'
import axios from "axios";


const HostingList = ({ event, switchView, myUser, remove }) => {

    const [attendeeNumber, setAttendeeNumber] = useState('Be the first to confirm your presence!')

    const numberOfAttendees = async () => {
        const { data } = await axios.get('http://localhost:3000/api/attendees-users/' + event.id)
        const attendeesCount = data.length
        if (attendeesCount > 1) {
            setAttendeeNumber(attendeesCount + ' people attending!')
        }
        else if (attendeesCount === 1) {
            setAttendeeNumber(attendeesCount + ' person attending!')
        }
        else setAttendeeNumber('Be the first to confirm your presence!')

    }

    useEffect(() => {

        numberOfAttendees()
    })


    return (
        <>

            <div className="event-card">
                <img src={event.imageUrl} alt="no content" />
                <div className="event-type">Organized by: {myUser.user.name}</div>
                <div className="event-type">{event.type}</div>
                <div className="event-type">{moment(event.date).fromNow()}</div>
                <div className="event-type">{attendeeNumber}</div>
                <h4 className="hosting-name">{event.name}</h4>
                <p className="event-description">{event.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={() => { switchView('updateEvent', event) }}>Update</button>
                    <button className="participate" onClick={() => { remove(event.id) }}>Remove</button>
                </div>
            </div>
        </>


    )


}


export default HostingList