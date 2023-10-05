import React from "react";



const Remove = ({ remove, toggle, event }) => {




    return (

        <div className="removeModal">
            <div className="overlay" onClick={toggle}></div>
            <div className="modalContent">

                <h2>Are you sure you want to remove this event?</h2>

                <button className="modal-btn" onClick={() => { remove(event.id); toggle() }}>Yes</button>
                <button className="modal-btn" onClick={toggle}>No</button>
            </div>


        </div>




    )
}


export default Remove