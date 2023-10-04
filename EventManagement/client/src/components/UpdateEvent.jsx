import React, { useState } from "react";



const UpdateEvent = ({ clickedEvent, user, switchView, update }) => {

    const [event, setEvent] = useState({
        name: clickedEvent.name, date: clickedEvent.date.replace('Z', ''), organizer: user.user.id, type: clickedEvent.type,
        imageUrl: clickedEvent.imageUrl, details: clickedEvent.details, location: clickedEvent.location
    })


    const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        setEvent({ ...event, [name]: value })
        console.log(event)

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        update(event, clickedEvent.id)
        switchView('hosting')

    }



    return (

        <div className="addForm" onSubmit={handleSubmit} >
            <form >
                <label for="name">Update Name</label>
                <input type="text" name="name" placeholder={event.name} onChange={handleChange} />
                <label for="type">Update Type</label>
                <input type="text" name="type" placeholder={event.type} onChange={handleChange} />
                <label for="imageUrl">Update Image</label>
                <input type="text" name="imageUrl" placeholder={event.imageUrl} onChange={handleChange} />
                <label for="date">Update Date</label>
                <input type="datetime-local" name="date" onChange={handleChange} />
                <label for="details">Update Details</label>
                <input type="text" name="details" placeholder={event.details} onChange={handleChange} />
                <label for="location">Update Location</label>
                <input type="text" name="location" placeholder={event.location} onChange={handleChange} />
                <input type="submit" id="add-event-buttons" />
            </form>
        </div>
    )


}


export default UpdateEvent