import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'

toast.configure()
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
    const [error, setError] = useState({})

    const failedNotification = () => {
        toast.error('Unable to fetch results, try again!', { autoClose: 2500 })
    }

    // to fetch data the user wants after filtering
    const handleSearch = e => {
        e.preventDefault()
        const { bill_no, date_after, date_before, origin, destination, shipper, consignee } = search
        axios
            .get(`http://127.0.0.1:8000/bill/?bill_no=${bill_no}&date_after=${date_after}&date_before=${date_before}&origin=${origin}&destination=${destination}&shipper=${shipper}&consignee=${consignee}`)
            .then( response => {
                setData(response.data)
            })
            .catch( error => {
                failedNotification()
            })
    }

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setSearch(prev => {
            const newState = { ...prev }
            newState[name] = value
            return newState
        })
    }


    // a *dynamic form* to filter results according to user's request - any combination can work
    return (
        <>
            <hr />

            <form onSubmit={e => handleSearch(e)} >

                <ReusableInput
                    name="bill_no"
                    label="bill no"
                    required={false}
                    error={error.bill_no ? true : false}
                    help={error.bill_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="date_after"
                    label="from"
                    // required={false}
                    error={error.date_after ? true : false}
                    help={error.date_after}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="date_before"
                    label="to"
                    // required={false}
                    error={error.date_after ? true : false}
                    help={error.date_after}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="origin"
                    label="origin"
                    required={false}
                    error={error.origin ? true : false}
                    help={error.origin}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="destination"
                    label="destination"
                    required={false}
                    error={error.destination ? true : false}
                    help={error.destination}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="shipper"
                    label="shipper"
                    required={false}
                    error={error.shipper ? true : false}
                    help={error.shipper}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="consignee"
                    label="consignee"
                    required={false}
                    error={error.consignee ? true : false}
                    help={error.consignee}
                    onChange={e => handleChange(e)}
                />

                <button> submit </button>

            </form> <hr />
        </>
    )
}

export default SearchFilter
