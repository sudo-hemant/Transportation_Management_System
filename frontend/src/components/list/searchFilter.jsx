import React, { useState } from 'react'
import axios from 'axios';


function SearchFilter({ setData }) {

    const [search, setSearch] = useState({
        bill_no: '',
        date_after: '',
        date_before: '',
        origin: '',
        destination: '',
        shipper: '',
        consignee: '',
    })

    // to fetch data the user wants after filtering
    const handleSearch = e => {
        e.preventDefault()
        const {bill_no, date_after, date_before, origin, destination, shipper, consignee} = search
        axios
            .get(`http://127.0.0.1:8000/bill/?bill_no=${bill_no}&date_after=${date_after}&date_before=${date_before}&origin=${origin}&destination=${destination}&shipper=${shipper}&consignee=${consignee}`)
            .then( response => {
                setData( response.data )
            })
    }

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setSearch( prev => {
            const newState = { ...prev }
            newState[name] = value
            return newState
        })
    }

    // a *dynamic form* to filter results according to user's request - any combination can work
    return (
        <>
            <hr/>
            <form onSubmit={ e => handleSearch(e) } >

                e-way bill : <input type="text" name="bill_no" onChange={ e => handleChange(e) } />
                from-date : <input type="date" name="date_after" onChange={e => handleChange(e) } />
                to-date : <input type="date" name="date_before" onChange={e => handleChange(e) } />
                origin : <input type="text" name="origin" onChange={ e => handleChange(e) } /> <br/><br/>
                destination : <input type="text" name="destination" onChange={ e => handleChange(e) } /> <br/><br/>
                shipper : <input type="text" name="shipper" onChange={ e => handleChange(e) } /> <br/><br/>
                consignee : <input type="text" name="consignee" onChange={ e => handleChange(e) } /> <br/><br/>
                
                <button> submit </button>

            </form>
            <hr/>
        </>
    )
}

export default SearchFilter
