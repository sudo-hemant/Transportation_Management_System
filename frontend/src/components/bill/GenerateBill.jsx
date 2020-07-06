import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'
import '../../css/bill/generatebill.css'

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
        total_weight: '',
        total_amount: '',
    })


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

    const successNotification = () => {
        toast.success('Bill generated successfully', { autoClose: 2500 })
    }

    const failedNotification = () => {
        toast.error('Error, please check your date or try again!', { autoClose: 3000 })
    }

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
                response.data.forEach(i => {
                    weight += Number(i.weight)
                    amount += Number(i.total_charges)
                })

                setForm({
                    ...form,
                    total_weight: weight,
                    total_amount: amount
                })

                const tempForm = { ...form, total_amount: amount, total_weight: weight }

                return axios.post(`http://127.0.0.1:8000/generatebill/`, tempForm)
            })
            .then(response => {
                successNotification()
                setError({})
                history.push('/billsummary')
                console.log(response.status)

            })
            .catch(error => {
                (error.response) ? setError(error.response.data) : setError({})
                failedNotification()
                console.log(error)
            })
    }


    return (
        <>

            <p id="generate-bill-header"> Create New Bill </p>

            <form className="generate-bill" onSubmit={e => handleGenerateBill(e)} >

                <div>
                    <Autocomplete
                        options={existingCustomers}
                        getOptionLabel={option => option.name}
                        id="select-shipper"
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
                    <button id="generate-bill-btn"> Generate Bill </button>
                </div>

            </form>

        </>
    )
}

export default GenerateBill
