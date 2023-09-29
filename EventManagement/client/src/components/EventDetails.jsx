import React from "react";


const EventDetails = ({ clickedEvent }) => {





    return (


        <div class="event-details">
            <img src={clickedEvent.imageUrl} alt="no content" />
            <div class="event-details-content">
                <h4>{clickedEvent.name}</h4>
                <div className="organizer">Organized by: {clickedEvent.owner}</div>
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