import React, { useState, useEffect } from "react";
import moment from 'moment'
import axios from "axios";
import Remove from './Remove.jsx'
import UpdateEvent from "./UpdateEvent.jsx";

const HostingList = ({ event, switchView, myUser, remove, update, clickedEvent }) => {

    const [attendeeNumber, setAttendeeNumber] = useState('No attendees yet')
    const [removeModal, setRemoveModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)


    const toggleRemoveModal = () => {

        setRemoveModal(!removeModal)
    }

    const toggleUpdateModal = () => {

        setUpdateModal(!updateModal)
        switchView('hosting', event)
    }


    const numberOfAttendees = async () => {
        const { data } = await axios.get('http://localhost:3000/api/attendees-users/' + event.id)
        const attendeesCount = data.length
        if (attendeesCount > 1) {
            setAttendeeNumber(attendeesCount + ' people attending!')
        }
        else if (attendeesCount === 1) {
            setAttendeeNumber(attendeesCount + ' person attending!')
        }
        else setAttendeeNumber('No attendees yet')

    }

    useEffect(() => {

        numberOfAttendees()
    })

    if (removeModal || updateModal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    return (
        <>

            <div className="event-card">
                {removeModal && <Remove remove={remove} toggle={toggleRemoveModal} event={event} />}
                {updateModal && <UpdateEvent clickedEvent={clickedEvent} user={myUser} switchView={switchView} update={update} toggle={toggleUpdateModal} />}
                <img src={event.imageUrl} alt="no content" />
                <div className="event-type">Organized by: {myUser.user.name}</div>
                <div className="event-type">{event.type}</div>
                <div className="event-type">{moment(event.date).fromNow()}</div>
                <div className="event-type">{attendeeNumber}</div>
                <h4 className="hosting-name">{event.name}</h4>
                <p className="event-description">{event.details.substring(0, 93)}...</p>
                <div className="event-bottom-card">
                    <button className="participate" onClick={toggleUpdateModal}>Update</button>
                    <button className="participate" onClick={toggleRemoveModal}>Remove</button>
                </div>
            </div>
        </>


    )


}


export default HostingList