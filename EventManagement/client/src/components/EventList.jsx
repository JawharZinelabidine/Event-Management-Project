import React from "react";
import EventListItems from "./EventListItems.jsx";


const EventList = ({ events, users, switchView }) => {


    return (

        <div>
            <div className="event-list">

                {events.map((event) => {

                    return <EventListItems key={event.id} event={event} users={users} switchView={switchView} />
                })}

            </div>
        </div>

    )
}


export default EventList