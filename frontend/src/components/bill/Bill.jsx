import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ReactHtmlTableToExcel from 'react-html-table-to-excel'

import '../../css/bill/Bill.css'
import axios from 'axios'


function Bill() {

    const { state } = useLocation()
    const billNo = state.billNo

    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [transactions, setTransactions] = useState({})
    const [customerDetils, setCustomerDetails] = useState({
        name: '',
        address: '',
        gst_no: '',
    })

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/listgeneratebill/${billNo}`)
            .then(response => {
                const data = response.data
                setInvoiceDetails({ data })
                const fromDate = [data.date_from.slice(8, 10), "-", data.date_from.slice(5, 7), "-", data.date_from.slice(0, 4)].join('')
                const toDate = [data.date_to.slice(8, 10), "-", data.date_to.slice(5, 7), "-", data.date_to.slice(0, 4)].join('')
                const billDate = [data.bill_date.slice(8, 10), "-", data.bill_date.slice(5, 7), "-", data.bill_date.slice(0, 4)].join('')
                setInvoiceDetails({
                    ...data,
                    date_from: fromDate,
                    date_to: toDate,
                    bill_date: billDate,
                })
                setTransactions(data.bill)
                setCustomerDetails({
                    ...customerDetils,
                    name: data.customer.name,
                    address: data.customer.address,
                    gst_no: data.customer.gst_no,
                })
                console.log(data)
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
                </div>


                <table className="bill-table" border="1">

                    <thead>
                        <tr>
                            <th> Sr. </th>
                            <th> Date </th>
                            <th> Doc No </th>
                            <th> Origin </th>
                            <th> Dest </th>
                            <th> Pcs </th>
                            <th> Weight </th>
                            <th> Rate </th>
                            <th> Freight </th>
                            <th> AWB </th>

                            <th> Amount </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Object.entries(transactions).map((item, key) => (
                                <tr key={key}>
                                    <td> {key + 1} </td>
                                    <td> {item[1].date.slice(8, 10) + '-' + item[1].date.slice(5, 7) + '-' + item[1].date.slice(0, 4)} </td>
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
                        <tr>
                            <td></td>
                            <td> <b> Total </b> </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> {invoiceDetails.total_weight} </td>
                            <td></td>
                            <td> {invoiceDetails.total_weight_charges} </td>
                            <td> {invoiceDetails.total_other_charges} </td>
                            <td> {invoiceDetails.gross_amount} </td>
                        </tr>

                    </tbody>

                </table> <br /> <br /> <hr />


                <div id="footer">

                    <div id="terms-conditions">
                        <p id="terms-conditions-header"> <b> Terms & conditions </b> </p> <hr />
                        <p id="font">
                            1. Payment must be made by account payee cheque in favour
                                of <b> "Vishal Express Logistic Service" </b> .
                        </p> <hr />
                        <p id="font"> 2. Cheque subject to realisation. </p> <hr />
                        <p id="font"> 3. Payment should be cleared within 7 days from submission of bill. </p> <hr />
                        <p id="font">
                            4. If the bill is not paid within schedule time, interest <b> @24% P.A. </b>
                                will be charged
                        </p> <hr />
                        <p id="font">
                            5. Any discripancy found in the bill should be reported within seven days from
                            the date of submission of the bill.
                        </p> <hr />
                        <p id="font"> <b> 6. Subject to _____ Jurisdiction </b> </p> <hr /> <br /> <hr />

                        <p id="bank-details"> <b> Bank details as under : </b> </p> <hr />
                        <table id="bank-details-table">
                            <tbody>
                                <tr>
                                    <td> <b> Bank </b> </td>
                                    <td> IDBI Bank </td>
                                    <td> <b> Branch </b> </td>
                                    <td> ________________ </td>
                                </tr>

                                <tr>
                                    <td> <b> Bank A/c No. </b> </td>
                                    <td> 0554102000091297 </td>
                                    <td> <b> IFSC Code </b> </td>
                                    <td> IBKL0000554 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="total">
                        <table className="new-amount-table" border="1">
                            <tbody>
                                <tr>
                                    <th> C.GST </th>
                                    <td> {invoiceDetails.cgst} </td>
                                </tr>

                                <tr>
                                    <th> S.GST </th>
                                    <td> {invoiceDetails.sgst} </td>
                                </tr>

                                <tr>
                                    <th> I.GST </th>
                                    <td> {invoiceDetails.igst} </td>
                                </tr>

                                <tr>
                                    <th> Total Tax </th>
                                    <td>
                                        {(parseInt(invoiceDetails.cgst) + parseInt(invoiceDetails.sgst) + parseInt(invoiceDetails.igst)).toString()}
                                    </td>
                                </tr>

                                <tr>
                                    <th> Net Amount </th>
                                    <td> {invoiceDetails.net_amount} </td>
                                </tr>

                                <tr>
                                    <th id="for-company" colSpan="2"> For Vishal Express Logistic Service </th>
                                </tr>

                                <tr>
                                    <th id="authorized-signatory" colSpan="2"> Authorized Signatory </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div> <hr />

            </div>


            {/* <ReactHtmlTableToExcel
                table="tbl"
                filename="tablexls"
                sheet="tablexls"
                buttonText="download as xls"
            />

            <button onClick={createPdf} > create pdf </button> */}
            {/* <button onClick={CreatePDFfromHTML} > create pdf </button> */}
        </>
    )
}

export default Bill



