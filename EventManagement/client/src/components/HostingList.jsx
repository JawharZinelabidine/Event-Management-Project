import React, { useState } from "react";
import moment from 'moment'


const HostingList = ({ event, switchView, myUser, remove }) => {

    return (
        <>

            <div className="event-card">
                <img src={event.imageUrl} alt="no content" />
                <div className="event-type">Organized by: {myUser.user.name}</div>
                <div className="event-type">{event.type}</div>
                <div className="event-type">{moment(event.date).fromNow()}</div>
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