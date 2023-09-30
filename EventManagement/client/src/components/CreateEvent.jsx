import React, { useState } from "react";



const CreateEvent = ({ user, add, switchView }) => {

    const [event, setEvent] = useState({ organizer: user.id })


    const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        setEvent({ ...event, [name]: value })


    }

    const handleSubmit = (e) => {

        e.preventDefault()
        add(event)
        switchView('eventList')

    }



    return (

        <div className="addForm" >
            <form onSubmit={handleSubmit}>
                <label for="name">Event Name</label>
                <input type="text" name="name" onChange={handleChange} />
                <label for="type" >Event Type</label>
                <input type="text" name="type" onChange={handleChange} />
                <label for="imageUrl">Event Image</label>
                <input type="text" name="imageUrl" onChange={handleChange} />
                <label for="date">Event Date</label>
                <input type="datetime-local" name="date" onChange={handleChange} />
                <label for="details">Event Details</label>
                <input type="text" name="details" onChange={handleChange} />
                <label for="location">Event Location</label>
                <input type="text" name="location" onChange={handleChange} />
                <input type="submit" id="add-event-buttons" />
            </form>
        </div>
    )


}


export default CreateEvent