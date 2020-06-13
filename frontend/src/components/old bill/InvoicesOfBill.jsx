import React, { useEffect } from 'react'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'


function InvoicesOfBill({ invoices }) {

    useEffect(() => {
        console.log(invoices);
    }, [])

    return (
        <>
            {/*  for creating a button to take the bill data into excel file */}
            <ReactHtmlTableToExcel
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as xls"
            />

            <table id="table-to-xls" >
                <thead>
                    <tr>
                        <td> bill no</td>
                        <td> date </td>
                        <td> from </td>
                        <td> to </td>
                        <td> consignee </td>
                        <td> weight </td>
                        <td> rate </td>
                        <td> total </td>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td> {invoice.e_way_bill_no} </td>
                            <td> {invoice.date} </td>
                            <td> {invoice.origin} </td>
                            <td> {invoice.destination} </td>
                            <td> {invoice.consignee} </td>
                            <td> {invoice.actual_weight} </td>
                            <td> {invoice.rate_per_kg} </td>
                            <td> {invoice.total_charges} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default InvoicesOfBill
