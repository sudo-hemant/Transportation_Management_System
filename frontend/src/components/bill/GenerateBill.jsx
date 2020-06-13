import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function GenerateBill() {

    const history = useHistory()


    const [existingCustomers, setExistingCustomers] = useState([])
    const [error, setError] = useState({})

    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [idsInRange, setIdsInRange] = useState([])

    const [form, setForm] = useState({
        customer: '',
        generate_bill_no: '',
        bill: [],
        bill_date: '',
        date_from: '',
        date_to: '',
        total_weight: 0,
        total_amount: 0,
    })

    // const 

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/customersname`)
            .then(response => {
                setExistingCustomers(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const handleCustomerSelection = (e, value) => {
        e.preventDefault()
        setForm({
            ...form,
            customer: value ? value.id : '',
            bill: []
        })
        setSelectedCustomer(value.name)
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

    const successNotification = () => {
        toast.success('Bill generated successfully', { autoClose: 2500 })
    }

    const failedNotification = () => {
        toast.error('Error, please check your date or try again!', { autoClose: 3000 })
    }

    const handleGenerateBill = e => {
        e.preventDefault()
        const { date_from, date_to } = form

        axios
            .get(`http://127.0.0.1:8000/billids/?shipper=${selectedCustomer}&date_after=${date_from}&date_to=${date_to}`)
            .then(response => {
                console.log(response.data)
                
                setIdsInRange(response.data)

                response.data.map(add => {
                    form.bill.push(add.id)
                })
                
                let weight = 0
                let amount = 0
                response.data.forEach( i => {
                    weight += Number(i.actual_weight)
                    amount += Number(i.total_charges)
                })

                setForm({
                    ...form,
                    total_weight: weight,
                    total_amount: amount
                })

                return axios.post(`http://127.0.0.1:8000/generatebill/`, form)
            })
            .then(response => {
                successNotification()
                console.log(response.status)
            })
            .catch(error => {
                (error.response) ? setError(error.response.data) : setError({})
                failedNotification()
                console.log(error.response.data)
            })
    }


    return (
        <>

            <form onSubmit={e => handleGenerateBill(e)} >

                <Autocomplete
                    options={existingCustomers}
                    getOptionLabel={option => option.name}
                    onChange={(e, value) => handleCustomerSelection(e, value)}
                    renderInput={params =>
                        <TextField
                            {...params}
                            required
                            label="select shipper"
                            variant="outlined"
                        />
                    }
                />

                <ReusableInput
                    type="number"
                    name="generate_bill_no"
                    label="Bill No"
                    error={error.generate_bill_no ? true : false}
                    help={error.generate_bill_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="bill_date"
                    label="Generate date"
                    error={error.bill_date ? true : false}
                    help={error.bill_date}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="date_from"
                    label="from"
                    error={error.date_from ? true : false}
                    help={error.date_from}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="date_to"
                    label="to"
                    error={error.date_to ? true : false}
                    help={error.date_to}
                    onChange={e => handleChange(e)}
                />

                {/* <ReusableInput
                    type="number"
                    name="total_weight"
                    label="weight"
                    error={error.total_weight ? true : false}
                    help={error.total_weight}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="total_amount"
                    label="amount"
                    error={error.total_amount ? true : false}
                    help={error.total_amount}
                    onChange={e => handleChange(e)}
                /> */}

                <button> Generate Bill </button>

            </form>

        </>
    )
}

export default GenerateBill
