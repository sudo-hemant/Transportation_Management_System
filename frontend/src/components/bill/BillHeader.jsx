import React, { useEffect, useState } from 'react'
import axios from 'axios'


function BillHeader({ from, to, owner_id, bill_no }) {


    const [customer, setCustomer] = useState([])

    // to fetch all the details of the bill owner
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/customer/${owner_id}`)
            const data = await response.data
            setCustomer(data)
        }
        fetch()
    }, [])

    return (
        <>
            bill no: {bill_no} <br/>
            from : {from}  
            -  
            to : {to} <br/>
            name: {customer.name} <br/>
            address: {customer.address} <br/>
            gst no: {customer.gst_no} <br/>
            pan no: {customer.pan_no} <br/>
        </>
    )
}

export default BillHeader
