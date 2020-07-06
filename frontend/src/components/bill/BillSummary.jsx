import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'
import '../../css/bill/fetchbill.css'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import BillSummaryTable from './BillSummaryTable'


toast.configure()
function BillSummary() {

    const [existingCustomers, setExistingCustomers] = useState([])

    const [form, setForm] = useState({
        customer: '',
        generate_bill_no: '',
        date_after: '',
        date_before: ''
    })
    const [error, setError] = useState({})

    const [listOfBill, setListOfBill] = useState([])

    const [displayTable, setDisplayTable] = useState(false)

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/customersname`)
            .then(response => {
                setExistingCustomers(response.data)
                console.log(response.data)
            })
    }, [])

    const handleCustomerChange = (e, value) => {
        e.preventDefault()
        setForm({
            ...form,
            customer: value ? value.id : ''
        })
    }

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { customer, generate_bill_no, date_after, date_before } = form
        console.log(customer)

        let allEmpty = true
        for (const key in form) {
            if (form[key] !== '') {
                allEmpty = false
            }
        }

        if (!allEmpty) {
            axios
                .get(`http://127.0.0.1:8000/generatebill/?customer=${customer}&generate_bill_no=${generate_bill_no}&date_after=${date_after}&date_before=${date_before}`)
                .then(response => {
                    setError({})
                    setListOfBill(response.data)
                    setDisplayTable(true)
                    console.log(response.data)
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                })
        } else {
            // TODO: NOTIFY 
            console.log("select atleast 1 field")
        }
    }


    return (
        <>

            <p id="fetch-bill-header"> Fetch Bill </p>

            <form className="fetch-bill" onSubmit={e => handleSubmit(e)} >

                <div>
                    <Autocomplete
                        options={existingCustomers}
                        getOptionLabel={option => option.name}
                        id="customer"
                        onChange={(e, value) => handleCustomerChange(e, value)}
                        renderInput={params =>
                            <TextField
                                {...params}
                                label="customer"
                                variant="outlined"
                            />}
                    />

                    <ReusableInput
                        required={false}
                        type="number"
                        name="generate_bill_no"
                        label="Bill No"
                        error={error.generate_bill_no ? true : false}
                        help={error.generate_bill_no}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        required={false}
                        type="date"
                        name="date_after"
                        label="From"
                        error={error.date_after ? true : false}
                        help={error.date_after}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        required={false}
                        type="date"
                        name="date_before"
                        label="To"
                        error={error.date_before ? true : false}
                        help={error.date_before}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <button id="fetch-bill-btn"> Fetch Bills </button>
                </div>

            </form>

            <hr />

            {displayTable && <BillSummaryTable listOfBill={listOfBill} existingCustomers={existingCustomers} />}
        </>
    )
}

export default BillSummary
