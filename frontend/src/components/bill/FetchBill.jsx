import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function FetchBill() {

    const [existingCustomers, setExistingCustomers] = useState([])

    const [form, setForm] = useState({
        customer: 0,
        generate_bill_no: 0,
        date_after: '',
        date_before: ''
    })
    const [error, setError] = useState({})

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
            customer: value ? value.id : 0
        })
    }

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setForm({
            ...form,
            [name]: Number(value)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { customer, generate_bill_no, date_after, date_before } = form
        axios
            .get(`http://127.0.0.1:8000/generatebill/?customer=${customer}&generate_bill_no=${generate_bill_no}&date_after=${date_after}&date_before=${date_before}`)
            .then(response => {
                console.log(response.data)
            })

        console.log(typeof form.customer)
        console.log(typeof form.generate_bill_no)
        console.log(typeof form.date_after)
        console.log(typeof form.date_before)
    }


    return (
        <>
            <form onSubmit={e => handleSubmit(e)} >

                <Autocomplete
                    // freeSolo
                    options={existingCustomers}
                    style={{ width: 300 }}
                    getOptionLabel={option => option.name}
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

                <button> Fetch Bills </button>

            </form>
        </>
    )
}

export default FetchBill
