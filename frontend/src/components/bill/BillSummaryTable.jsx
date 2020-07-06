import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


function BillSummaryTable({ listOfBill, existingCustomers }) {

    const history = useHistory()

    const [billDetails, setBillDetails] = useState({})

    useEffect(() => {
        console.log("typ", typeof listOfBill)
    }, [])

    const handleDetailView = (e, billNo) => {
        e.preventDefault()
        axios
            .get(`http://127.0.0.1:8000/listgeneratebill/${billNo}`)
            .then(response => {
                setBillDetails(response.data)

                history.push({
                    pathname: `/bill`,
                    state: {
                        billDetails
                    }
                })
                console.log(response.data)
            })
            // TODO:  MODIFICATION REMAINING
            .catch(error => {
                console.log("some error occured")
            })
    }


    if (listOfBill.length == 0)
        return <p id="no-bill"> No Bill to display </p>

    return (
        <>
            <table border="1" className="fetch-bill-table">

                <thead>
                    <tr>
                        <th> Bill No </th>
                        <th> Generated Date </th>
                        <th colSpan="2"> Bill Period </th>
                        <th> Weight </th>
                        <th> Amount </th>
                        <th> Detail View </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listOfBill.map((shipment, key) => (
                            <tr key={key}>
                                <td> {shipment.generate_bill_no} </td>
                                <td> {shipment.bill_date} </td>
                                <td> {shipment.date_from} </td>
                                <td> {shipment.date_to} </td>
                                <td> {shipment.total_weight} </td>
                                <td> {shipment.total_amount} </td>
                                <td>
                                    <button id="bill-detail-btn" onClick={e => handleDetailView(e, shipment.generate_bill_no)} > See Detail </button>
                                </td>
                            </tr>
                        ))
                        // console.log(typeof listOfBill);
                    }
                </tbody>

            </table>
        </>
    )
}

export default BillSummaryTable

