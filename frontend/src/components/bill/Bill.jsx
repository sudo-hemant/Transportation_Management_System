import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import BillHeader from './BillHeader'
import InvoicesOfBill from './InvoicesOfBill'


function Bill() {

    const { state } = useLocation()
    const [billdata, setBilldata] = useState([])

    // fetch the bill by bill no passed from 'selectshipper.jsx'
    useEffect(() => {
        const no = state.billno
        const fetchBill = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/listgeneratebill/${no}`)
            const data = await response.data
            setBilldata(data)
        }
        fetchBill()
    }, [])

    return (
        <>
            {/*  to display the header of the bill */}
            <BillHeader
                from={state.bill_owner.date_after}
                to={state.bill_owner.date_before}
                owner_id={state.owner_id}
                bill_no={state.billno}
            />

            <hr /> <hr />

            {/* to display the table of all invoices */}
            <InvoicesOfBill invoices={state.invoices} />
        </>
    )
}

export default Bill
