import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ReactHtmlTableToExcel from 'react-html-table-to-excel'

import '../../css/bill/Bill.css'
import axios from 'axios'


function Bill() {

    const { state } = useLocation()
    const data = state.billDetails

    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [transactions, setTransactions] = useState({})
    const [customerDetils, setCustomerDetails] = useState({
        name: '',
        address: '',
        gst_no: '',
    })

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/listgeneratebill/999`)
            .then(response => {
                const data = response.data
                setInvoiceDetails(data)
                setTransactions(data.bill)
                setCustomerDetails({
                    ...customerDetils,
                    name: data.customer.name,
                    address: data.customer.address,
                    gst_no: data.customer.gst_no,
                })

                console.log(data)
                console.log("type", typeof data.bill);
            })
    }, [])


    return (
        <>

            <div id="invoice">

                <div id="main-header">
                    <img id="img" src="https://assets.materialup.com/uploads/62f3710b-cce3-4f33-95f9-784997f539ef/google_g_mark_symbol_icon_rebrand_redesign_2015_revised_by_alex_tass.gif" alt="loading" />
                    <p id="company-name"> Vishal Express Logistic Services </p>
                </div> <hr />

                <div id="company-address">
                    <p id="address"> <b> JG-33, Japan Market, Delhi Gate, Ring Road, Surat-395002 </b> </p>
                </div> <hr />

                <div id="gst-pan-no">
                    <p id="gst-no"> <b> GST No : </b> 24AYQPS8587E1ZM </p>
                    <p id="tax-invoice"> <b> TAX-INVOICE </b> </p>
                    <p id="pan-no"> <b> PAN No : </b> AYQPS8587E  </p>
                </div> <hr />

                <div id="invoice-details">
                    <div id="customer-details">
                        <p><b> To, </b></p>
                        <p><b> {customerDetils.name} </b></p>
                        <p> {customerDetils.address} </p>
                        <br />
                        <p> <b> GSTIN No :- </b> {customerDetils.gst_no} </p>
                    </div>

                    <div id="invoice-period">
                        <p><b>Period From :- </b> {invoiceDetails.date_from} </p>
                        <p><b>Period To      :- </b> {invoiceDetails.date_to} </p>
                        <p><b>Invoice No    :- </b> {invoiceDetails.generate_bill_no} </p>
                        <br />
                        <p><b>Invoice Date :- </b> {invoiceDetails.bill_date} </p>
                    </div>
                </div> <hr />

                <div>
                    <p id="declaration">
                        We submit herewith our monthly/weekly/fortnightly bill towards freight charges for
                        the booking during the period {invoiceDetails.date_from} To {invoiceDetails.date_to}.
                    </p>
                </div> <hr/>

                <table className="bill-table" border="1">

                    <thead>
                        <tr>
                            <td> Sr. </td>
                            <td> Date </td>
                            <td> Doc. No. </td>
                            <td> Origin </td>
                            <td> Dest </td>
                            <td> Pcs. </td>
                            <td> Weight </td>
                            <td> Rate </td>
                            {/* TODO: NAME OF BELOW 2 COL */}
                            <td> Freight </td>
                            <td> AWB </td>

                            <td> Amount </td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Object.entries(transactions).map( (item, key) => (
                                <tr key={key}>
                                    <td> {key+1} </td>
                                    <td> {item[1].date} </td>
                                    <td> {item[1].doc_no} </td>
                                    <td> {item[1].origin} </td>
                                    <td> {item[1].destination} </td>
                                    <td> {item[1].pieces} </td>
                                    <td> {item[1].weight} </td>
                                    <td> {item[1].rate} </td>
                                    <td> {item[1].weight_charges} </td>
                                    <td> {item[1].other_charges} </td>
                                    <td> {item[1].total_charges} </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>






            </div>

            <ReactHtmlTableToExcel
                table="tbl"
                filename="tablexls"
                sheet="tablexls"
                buttonText="download as xls"
            />

            <button onClick={createPdf} > create pdf </button>

        </>
    )
}

export default Bill


const createPdf = () => {
    var table = document.getElementById('tab').innerHTML

    var style = "<style>"
    style = style + "table {border-collapse: collapse;}"
    style = style + "table td{padding: 3rem;}"
    style = style + "</style>"

    var win = window.open('', '', 'height=700, width=700')

    win.document.write('<html><head>');
    win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(table);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print()

}
