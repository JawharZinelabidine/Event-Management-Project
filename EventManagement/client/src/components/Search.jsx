import React, { useState } from "react";


const Search = ({ filter }) => {

    const [filterBy, setFilterBy] = useState('')



    const handleChange = (e) => {

        setFilterBy(e.target.value)

    }


    const handleSearch = () => {

        filter(filterBy)
        setFilterBy('')

    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
            e.target.value = ''
        }
    }


    return (
        <div className="searchContainer">
            <input type='search' id='search' placeholder='Search event' value={filterBy} onChange={handleChange} onKeyUp={handleEnter} />
            <button id="searchBtn" onClick={handleSearch}></button>
        </div>

    )
}



export default Search