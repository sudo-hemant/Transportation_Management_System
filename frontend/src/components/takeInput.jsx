import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from './ReusableInput'
import '../css/profile/TakeInput.css'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function TakeInput() {

    const history = useHistory()

    // to handle data coming from bill model which is used for entry of particular data
    const [data, setData] = useState({
        doc_no: '',
        date: '',
        origin: '',
        destination: '',
        shipper: '',
        consignee: '',
        mode: '',
        flight_no: '',
        pieces: '',
        weight: '',
        payment_mode: '',
        rate: '',
        weight_charges: '',
        other_charges: '',
        total_charges: '',
    })

    // to store error occured in any input field in form
    const [error, setError] = useState({})

    // to store the name & id of existing customers
    const [existingCustomers, setExistingCustomers] = useState([])

    const mode = [
        { name: 'Air' },
        { name: 'Train' },
        { name: 'Surface' }
    ]

    const paymentMode = [
        { name: 'Cash' },
        { name: 'Credit' },
        { name: 'Cheque' }
    ]


    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/customersname`)
            .then(response => {
                setExistingCustomers(response.data)
                console.log(response.data);
            })
            .catch(error => console.log(error))
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
        setData({
            ...data,
            [name]: value
        })
    }

    // to handle change - if user selects shipper from existing customer
    const handleShipperChange = (e, value) => {
        e.preventDefault()

        setData({
            ...data,
            shipper: value ? value.name : ''
        })
    }


    return (
        <>
            <p id="header"> Enter Data </p>

            <form onSubmit={e => handleSubmit(e)} className="input-form" >

                <div>
                    <ReusableInput
                        type="number"
                        name="doc_no"
                        label="Doc No."
                        error={error.doc_no ? true : false}
                        help={error.doc_no}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="date"
                        name="date"
                        label="Date"
                        error={error.date ? true : false}
                        help={error.date}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <Autocomplete
                        freeSolo
                        options={existingCustomers}
                        id="shipper"
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setData({
                            ...data,
                            shipper: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                // fullWidth
                                label="Shipper"
                                name="shipper"
                                error={error.shipper ? true : false}
                                helperText={error.shipper}
                                onChange={e => handleChange(e)}
                                variant="outlined"
                            />}
                    />

                    <ReusableInput
                        name="consignee"
                        label="Consignee"
                        error={error.consignee ? true : false}
                        help={error.consignee}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="origin"
                        label="Origin"
                        error={error.origin ? true : false}
                        help={error.origin}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="destination"
                        label="Destination"
                        error={error.destination ? true : false}
                        help={error.destination}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <Autocomplete
                        options={mode}
                        id="mode"
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setData({
                            ...data,
                            mode: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                label="Mode"
                                error={error.mode ? true : false}
                                helperText={error.mode}
                                variant="outlined"
                            />}
                    />

                    <ReusableInput
                        required={false}
                        name="flight_no"
                        label="Flight No"
                        error={error.flight_no ? true : false}
                        help={error.flight_no}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        type="number"
                        name="pieces"
                        label="Pcs"
                        error={error.pieces ? true : false}
                        help={error.pieces}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="weight"
                        label="Weight"
                        error={error.weight ? true : false}
                        help={error.weight}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="rate"
                        label="Rate"
                        error={error.rate ? true : false}
                        help={error.rate}
                        onChange={e => handleChange(e)}
                    />

                    <Autocomplete
                        options={paymentMode}
                        id="payment-mode"
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setData({
                            ...data,
                            payment_mode: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                label="Pay-mode"
                                error={error.payment_mode ? true : false}
                                helperText={error.payment_mode}
                                variant="outlined"
                            />}
                    />
                </div>

                <div>
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
                </div>

                <div id="total-charges">
                    <ReusableInput
                        type="number"
                        name="total_charges"
                        label="Total Charges"
                        error={error.total_charges ? true : false}
                        help={error.total_charges}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <button id="input-form-submit"> Submit </button>
                </div>

            </form >
        </>
    )
}

export default TakeInput
