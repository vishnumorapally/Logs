import React, { useState } from 'react'
import { Logs } from './Logs'
import "./filters.css"

export const Filters = () => {
    const [Level, setLevel] = useState("All")
    const [filterType, setfilterType] = useState("All")
    const [fromDate, setfromDate] = useState("")
    const [toDate, settoDate] = useState("")
    const [search, setsearch] = useState("")
    const [filterBtn, setfilterBtn] = useState("show")

    const handleFilterBtn = () => {
        const searchId = document.getElementById("searchId")
        const levelId = document.getElementById("levelId")
        const typeId = document.getElementById("typeId")
        const fromId = document.getElementById("fromId")
        const toId = document.getElementById("toId")
        const filterId = document.getElementById("filterId")

        if (filterBtn === "show") {
            setfilterBtn("hide")
            filterId.style.height = "100%"
            searchId.style.display = "block"
            levelId.style.display = "block"
            typeId.style.display = "block"
            fromId.style.display = "block"
            toId.style.display = "block"    
        } else {
            setfilterBtn("show")
            filterId.style.height = "50px"
            searchId.style.display = "none"
            levelId.style.display = "none"
            typeId.style.display = "none"
            fromId.style.display = "none"
            toId.style.display = "none"
        }   
    }

    return (
        <div className='container'>
            <div className='filter-container' id='filterId'>
                <div className='filter-heading'>
                    <h1>Filters</h1>
                    <button className='filter-btn' onClick={handleFilterBtn}>{filterBtn}</button>
                </div>
                <div className='filter-search' id='searchId'>
                    <h4 className='filter-title'>Search</h4>
                    <input type="text" placeholder='Search...' className='filter-input' value={search} onChange={(e)=> setsearch(e.target.value)} />
                </div>
                <div className='filter-level' id='levelId'>
                    <h4 className='filter-title'>Log Level</h4>
                    <select value={Level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Info">Info</option>
                        <option value="Warning">Warning</option>
                        <option value="Error">Error</option>
                    </select>
                </div> 
                <div className='filter-level' id='typeId'>
                    <h4 className='filter-title'>Log Type</h4>
                    <select value={filterType} onChange={(e) => setfilterType(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Normal">Normal</option>
                        <option value="Anomaly">Anomaly</option>
                    </select>
                </div>
                <div className='filter-search' id='fromId'>
                    <h4 className='filter-title'>From</h4>
                    <input type="datetime-local" className='filter-input' value={fromDate} onChange={(e) => setfromDate(e.target.value)} />
                </div>
                <div className='filter-search' id='toId'>
                    <h4 className='filter-title'>To</h4>
                    <input type="datetime-local" className='filter-input' value={toDate} onChange={(e) => settoDate(e.target.value)} />
                </div>
            </div>
            <div className='log-container'>
                <Logs ftype={filterType} flever={Level} fsearch={search} ffrom={fromDate} fto={toDate} />
            </div>
        </div>
    )
}
