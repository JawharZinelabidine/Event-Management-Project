import React from "react";
import moment from "moment"


const EventDetails = ({ clickedEvent }) => {





    return (


        <div class="event-details">
            <img src={clickedEvent.imageUrl} alt="no content" />
            <div class="event-details-content">
                <h4>{clickedEvent.name}</h4>
                <div className="organizer">Organized by: {clickedEvent.owner}</div>
                <div className="organizer">On: {moment(clickedEvent.date).format('MMMM Do YYYY, h:mm a')}</div>
                <div className="type">{clickedEvent.type}</div>


                <p>{clickedEvent.details}</p>
                <div className="button">
                    <button>Participate</button>
                </div>

            </div>
        </div>


    )


}

export default EventDetails