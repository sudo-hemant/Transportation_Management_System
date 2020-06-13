import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from './ReusableInput'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function TakeInput() {

    const history = useHistory()

    // to handle data coming from bill model which is used for entry of particular data
    const [data, setData] = useState({
        e_way_bill_no: '',
        date: '',
        origin: '',
        destination: '',
        shipper: '',
        consignee: '',
        mode: '',
        flight_no: '',
        pieces: '',
        actual_weight: '',
        payment_mode: '',
        rate_per_kg: '',
        declared_value: '',
        weight_charges: '',
        other_charges: '',
        igst: '',
        cgst: '',
        sgst: '',
        total_charges: '',
    })
    // to store error occured in any input field in form
    const [error, setError] = useState({})

    // to store the name & id of existing customers
    const [existingCustomers, setExistingCustomers] = useState([])

    useEffect( () => {
        axios
            .get(`http://127.0.0.1:8000/customersname`)
            .then( response => {
                setExistingCustomers(response.data)
                console.log(response.data);
            })
    }, [])


    // toast notifications
    const successNotification = () => {
        toast.success('Successfully created the entry!', { autoClose: 2500 })
    }
    const failedNotification = () => {
        toast.error('Some error occured', { autoClose: 2000 })
    }

    // function to handle form submition
    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post('http://127.0.0.1:8000/bill/', data)
            .then(res => {
                setError({})
                successNotification()
                console.log(res)
            })
            .catch(error => {
                (error.response) ? setError(error.response.data) : setError({})
                failedNotification()
                console.log(error.response.data);
            })
    }

    // general purpose func to handle change in any input field 
    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setData(prevState => {
            const newState = { ...prevState }
            newState[name] = value
            return newState
        })
    }

    // to handle change - if user selects shipper from existing customer
    const handleShipperChange = (e, value) => {
        e.preventDefault()
        console.log(value)

        value ? setData({
            ...data,
            shipper: value.name 
        }) : setData({
            ...data, 
            shipper: ''
        })
    }


    return (
        <>
            <form onSubmit={e => handleSubmit(e)} id="input-form" >

                <ReusableInput
                    type="number"
                    name="e_way_bill_no"
                    label="E-Way Bill No"
                    error={error.e_way_bill_no ? true : false}
                    help={error.e_way_bill_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="date"
                    // label="Date"
                    error={error.date ? true : false}
                    help={error.date}
                    onChange={e => handleChange(e)}
                />

                <Autocomplete
                    freeSolo
                    options={existingCustomers}
                    style={{ width: 300 }}
                    getOptionLabel={option => option.name}
                    onChange={ (e, value) => handleShipperChange(e, value) }
                    renderInput={ params =>
                        <TextField
                            {...params}
                            required
                            label="shipper"
                            name="shipper"
                            error = {error.shipper ? true : false}
                            helperText = {error.shipper}
                            onChange={ e => handleChange(e) }
                            variant="outlined"
                        />}
                />

                <ReusableInput
                    name="consignee"
                    label="consignee"
                    error={error.consignee ? true : false}
                    help={error.consignee}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="origin"
                    label="origin"
                    error={error.origin ? true : false}
                    help={error.origin}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="destination"
                    label="destination"
                    error={error.destination ? true : false}
                    help={error.destination}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    required={false}
                    name="mode"
                    label="mode"
                    error={error.mode ? true : false}
                    help={error.mode}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    required={false}
                    name="flight_no"
                    label="flight No"
                    error={error.flight_no ? true : false}
                    help={error.flight_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="pieces"
                    label="pieces"
                    error={error.pieces ? true : false}
                    help={error.pieces}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="actual_weight"
                    label="actualWeight"
                    error={error.actual_weight ? true : false}
                    help={error.actual_weight}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="rate_per_kg"
                    label="ratePerKg"
                    error={error.rate_per_kg ? true : false}
                    help={error.rate_per_kg}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    required={false}
                    name="payment_mode"
                    label="Payment Mode"
                    error={error.payment_mode ? true : false}
                    help={error.payment_mode}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="declared_value"
                    label="Declared Value"
                    error={error.declared_value ? true : false}
                    help={error.declared_value}
                    onChange={e => handleChange(e)} />

                <ReusableInput
                    type="number"
                    name="weight_charges"
                    label="Weight Charges"
                    error={error.weight_charges ? true : false}
                    help={error.weight_charges}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="other_charges"
                    label="Other Charges"
                    error={error.other_charges ? true : false}
                    help={error.other_charges}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="igst"
                    label="igst"
                    error={error.igst ? true : false}
                    help={error.igst}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="cgst"
                    label="cgst"
                    error={error.cgst ? true : false}
                    help={error.cgst}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="sgst"
                    label="sgst"
                    error={error.sgst ? true : false}
                    help={error.sgst}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="total_charges"
                    label="Total Charges"
                    error={error.total_charges ? true : false}
                    help={error.total_charges}
                    onChange={e => handleChange(e)}
                />

                <button> Submit </button>

            </form >
        </>
    )
}

export default TakeInput
