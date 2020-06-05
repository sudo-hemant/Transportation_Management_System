import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


function SelectShipper() {

    const history = useHistory()

    // to store the names of all our customers for showing it as options 
    const [customers, setCustomers] = useState([])
    // to store the selected customer name and date range 
    const [fetchCustomerTransactions, setfetchCustomerTransactions] = useState({
        shipper: '',
        date_after: '',
        date_before: ''
    })    
    // to store all transaction of selected shipper
    const [invoice, setInvoice] = useState([])
    // it ll be used to create bill
    const [data, setData] = useState({
        generate_bill_no: '',
        customer: '',
        bill: []
    })


    // to fetch name of our all customers on page-load
    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/customersname`)
            const data = await response.data
            setCustomers(data)
        }
        fetchCustomers()
    }, [])

    // to handle change of customer selection of whom bill 'll be generated
    const handleCustomerChange = e => {
        e.preventDefault()
        // const value = e.target.value
        const value = e.target.value.split('.')[0] - 1
        // to fetch the details of the selected customer by the index value selected
        //  in dropdown from the customers list which is fetched on rendering 
        const selected = customers[value]

        // change the name of the selected shipper
        setfetchCustomerTransactions({
            ...fetchCustomerTransactions,
            shipper: selected.name
        })
        
        // change the id of the selected shipper
        setData({
            ...data,
            customer: selected.id,
            bill: []
        })
    }

    // to change the date range of the bill to be generated
    const handleDateChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setfetchCustomerTransactions( prev => {
            const newState = { ...prev }
            newState[name] = value
            return newState
        })
    }

    // to handle change of new bill no which ll be created
    const handleNoChange = e => {
        e.preventDefault()
        const value = e.target.value
        setData({
            ...data,
            generate_bill_no: value
        })
    }

    // this will fetch all the transactions of selected shipper within selected date range
    const handleSubmit = e => {
        e.preventDefault()
        
        const { shipper, date_after, date_before } = fetchCustomerTransactions

        const fetchInvoices = async () => {
            // next line 'll fetch the transaction of the selected customer
            const response = await axios.get(`http://127.0.0.1:8000/bill/?shipper=${shipper}&date_after=${date_after}&date_before=${date_before}`)
            const data = await response.data
            setInvoice(data)
            console.log(data)
        }
        fetchInvoices()
    }

    // this will create bill and ll link the created bill to all its transaction
    // and redirect us to 
    const generateBill = e => {
        e.preventDefault()

        // pushing all the ids of all transaction of selected shipper for the bill to be created
        invoice.map( add => (
            data.bill.push( add.id )
        ))
        console.log(data.bill)

        // creates bill
        const createBill = async () => {
            const status = await axios.post(`http://127.0.0.1:8000/generatebill/`, data)
            console.log(status.status)
        }
        createBill()

        // take us to '/bill', passing some imp information 
        history.push({
            pathname: '/bill',
            state: {
                billno: data.generate_bill_no,
                bill_owner: fetchCustomerTransactions,
                owner_id: data.customer,
                invoices: invoice
            }
        })
    }


    // to select the shipper of whom we want to generate the bill 
    return (
        <>

            {/* it will select the shipper  */}
            <form onSubmit={e => handleSubmit(e) }>
                
                <select name="shipper"  onChange={e => handleCustomerChange(e)} >
                    <option></option>
                    {
                        customers.map( (customer, key) => (
                            <option key={key}  >
                                { key + 1 + ". " + customer.name}
                            </option>
                        ))
                    }
                </select>

                from :
                <input type="date" name="date_after" onChange={e => handleDateChange(e) } /> <br/>

                to: 
                <input type="date" name="date_before" onChange={e => handleDateChange(e) }  /> <br/>
                
                <button> select shipper </button>

            </form>


            {/* it will generate bill */}
            <form onSubmit={e => generateBill(e) }>
                <input
                    type="number"
                    name="generate_bill_no"
                    // value={data.generate_bill_no}
                    onChange={e => handleNoChange(e)}
                />
                <button> Generate Bill </button>
            </form>

        </>
    )
}

export default SelectShipper
