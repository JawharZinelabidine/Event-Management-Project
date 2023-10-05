import React, { useState } from "react";



const UpdateEvent = ({ clickedEvent, user, switchView, update, toggle }) => {

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


    const handleImage = (e) => {
        const name = e.target.name
        const file = e.target.files[0]
        if (file) {
            const imageURL = URL.createObjectURL(file)
            setEvent({ ...event, [name]: imageURL })

        }
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        update(event, clickedEvent.id)
        toggle()

    }




    return (
        <>
            <div className="overlay" onClick={toggle}></div>
            <div className="updateForm" onSubmit={handleSubmit} >
                <form >
                    <label for="name">Update Name</label>
                    <input type="text" name="name" placeholder={event.name} onChange={handleChange} />
                    <label for="type">Update Type</label>
                    <input type="text" name="type" placeholder={event.type} onChange={handleChange} />
                    <label for="imageUrl">Update Image</label>
                    <input type="file" name="imageUrl" placeholder={event.imageUrl} onChange={handleImage} />
                    <label for="date">Update Date</label>
                    <input type="datetime-local" name="date" onChange={handleChange} />
                    <label for="details">Update Details</label>
                    <input type="text" name="details" placeholder={event.details} onChange={handleChange} />
                    <label for="location">Update Location</label>
                    <input type="text" name="location" placeholder={event.location} onChange={handleChange} />
                    <input type="submit" id="add-event-buttons" />
                </form>
            </div>
        </>
    )


}


export default UpdateEvent