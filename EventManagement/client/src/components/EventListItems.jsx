import React, { useEffect, useState } from "react";
import moment from 'moment'


const EventListItems = ({ event, users, switchView, participate, myUser }) => {


    const user = users.slice().find((user) => {
        return user.id === event.organizer
    })

    const thisEvent = event
    thisEvent.owner = user.name

    const buttonValue = localStorage.getItem('participate') === true


    let [changeText, setChangeText] = useState(true);




    const handleChange = () => {
        setChangeText(!changeText);


    };






    return (
        <>

            <div className="event-card">
                <img src={thisEvent.imageUrl} alt="no content" onClick={() => { switchView('eventDetails', thisEvent) }} />
                <div className="event-type">Organized by: {thisEvent.owner}</div>
                <div className="event-type">{thisEvent.type}</div>
                <div className="event-type">{moment(thisEvent.date).fromNow()}</div>
                <h4>{thisEvent.name}</h4>
                <p>{thisEvent.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={() => { handleChange(); participate({ users_id: myUser.id, events_id: event.id }) }}>{changeText ? "Participate" : "Going!"}</button>
                </div>
            </div>
        </>


    )


}


export default EventListItems