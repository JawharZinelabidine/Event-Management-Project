import React, { useEffect, useState } from "react";
import axios from "axios";
import GoingList from "./GoingList.jsx";



const Going = ({ myUser, users, switchView }) => {

    const [myEvents, setMyEvents] = useState([])

    const fetchMyEvents = async () => {

        try {
            const { data } = await axios.get('http://localhost:3000/api/attendees/' + myUser.id)
            setMyEvents(data)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteEvent = async (userID, eventID) => {

        try {
            await axios.delete('http://localhost:3000/api/attendees/' + userID + '/' + eventID)
            fetchMyEvents()
            localStorage.setItem('participate' + eventID + '-' + userID, 'Participate')

        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {

        fetchMyEvents()

    }, [])


    const sortedEvents = myEvents.slice().sort((a, b) => new Date(a.date) - new Date(b.date))

    return (

        <div>
            <div className="event-list">

                {sortedEvents.map((event) => {

                    return <GoingList key={event.events_id} event={event} myUser={myUser} remove={deleteEvent} users={users} switchView={switchView} />
                })}

            </div>
        </div>


    )
}


export default Going