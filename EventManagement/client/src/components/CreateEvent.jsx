import React, { useState } from "react";



const CreateEvent = ({ user, add, switchView, fetchEvents }) => {

    const [event, setEvent] = useState({
        organizer: user.user.id,
        name: '',
        date: '',
        type: '',
        imageUrl: '',
        details: '',
        location: ''
    })


    const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        setEvent({ ...event, [name]: value })
        console.log(event)


    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setEvent({ ...event, imageUrl: file })

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        add(event)
        switchView('eventList')


    }



    return (

        <div className="addForm" >
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Event Name</label>
                <input type="text" name="name" onChange={handleChange} />
                <label htmlFor="type" >Event Type</label>
                <input type="text" name="type" onChange={handleChange} />
                <label htmlFor="imageUrl">Event Image</label>
                <input type="file" name="imageUrl" onChange={handleImage} />
                <label htmlFor="date">Event Date</label>
                <input type="datetime-local" name="date" onChange={handleChange} />
                <label htmlFor="details">Event Details</label>
                <input type="text" name="details" onChange={handleChange} />
                <label htmlFor="location">Event Location</label>
                <input type="text" name="location" onChange={handleChange} />
                <input type="submit" id="add-event-buttons" />
            </form>
        </div>
    )


}


export default CreateEvent