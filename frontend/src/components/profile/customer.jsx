import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import ReusableInput from '../ReusableInput'
import '../../css/profile/CustomerRegistration.css'


// customer registration
toast.configure()
function Customer() {

    // for storing form data - i.e., customer details 
    const [customer, setCustomer] = useState({
        name: '',
        code: '',
        contract_no: '',
        contract_date: '',
        attendant: '',
        address: '',
        city: '',
        pin_code: '',
        state: '',
        country: '',
        e_mail: '',
        mobile_no: '',
        phone_1: '',
        phone_2: '',
        gst_no: '',
        gst_type: '',
        pan_no: '',
        payment_type: '',
    })
    // to store errors of the form 
    const [error, setError] = useState({})

    const paymentType = [
        { name: 'Cash' },
        { name: 'Credit' },
        { name: 'Cheque' }
    ]

    const gstType = [
        { name: 'IGST' },
        { name: 'CGST/SGST' }
    ]


    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setCustomer({
            ...customer,
            [name]: value
        })
    }

    // to display toast notification or success or error
    const successNotification = () => {
        toast.success('Successfully created the customer', { autoClose: 2500 })
    }
    const failedNotification = () => {
        toast.error('Some error occured', { autoClose: 2500 })
    }

    // to register our new customer
    const handleSubmit = e => {
        e.preventDefault()

        const surity = window.confirm("are you sure? you want to create new customer!")
        if (surity) {
            axios
                .post(`http://127.0.0.1:8000/customer/`, customer)
                .then(res => {
                    console.log(res)
                    setError({})
                    successNotification()
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                    failedNotification()
                })
        }
    }


    return (
        <>
            <p id="registration-header"> Customer Registration </p>

            <form id="registration" onSubmit={e => handleSubmit(e)} >

                <div>
                    <ReusableInput
                        name="name"
                        label="Name"
                        error={error.name ? true : false}
                        help={error.name}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="date"
                        name="contract_date"
                        label="Date"
                        error={error.contract_date ? true : false}
                        help={error.contract_date}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="code"
                        label="Code"
                        error={error.code ? true : false}
                        help={error.code}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="contract_no"
                        label="Contract no."
                        error={error.contract_no ? true : false}
                        help={error.contract_no}
                        onChange={e => handleChange(e)}
                        className="form-input"
                    />
                </div>

                <div>
                    <ReusableInput
                        name="attendant"
                        label="Attendant"
                        error={error.attendant ? true : false}
                        help={error.attendant}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="address"
                        label="Address"
                        error={error.address ? true : false}
                        help={error.address}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="city"
                        label="City"
                        error={error.city ? true : false}
                        help={error.city}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="pin_code"
                        label="Pin Code"
                        error={error.pin_code ? true : false}
                        help={error.pin_code}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="state"
                        label="State"
                        error={error.state ? true : false}
                        help={error.state}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="country"
                        label="Country"
                        error={error.country ? true : false}
                        help={error.country}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        type="email"
                        name="e_mail"
                        label="e-Mail"
                        error={error.e_mail ? true : false}
                        help={error.e_mail}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="mobile_no"
                        label="Mobile no."
                        error={error.mobile_no ? true : false}
                        help={error.mobile_no}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        type="number"
                        name="phone_1"
                        label="Phone-1"
                        required={false}
                        error={error.phone_1 ? true : false}
                        help={error.phone_1}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="phone_2"
                        label="Phone-2"
                        required={false}
                        error={error.phone_2 ? true : false}
                        help={error.phone_2}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="gst_no"
                        label="GST no."
                        error={error.gst_no ? true : false}
                        help={error.gst_no}
                        onChange={e => handleChange(e)}
                    />

                    <Autocomplete
                        options={gstType}
                        getOptionLabel={option => option.name}
                        style={{ width: '210px' }}
                        onChange={(e, value) => setCustomer({
                            ...customer,
                            gst_type: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                label="GST type"
                                error={error.gst_type ? true : false}
                                helperText={error.gst_type}
                                variant="outlined"
                            />}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="pan_no"
                        label="Pan no."
                        error={error.pan_no ? true : false}
                        help={error.pan_no}
                        onChange={e => handleChange(e)}
                        style={{ width: '210px' }}
                    />

                    <Autocomplete
                        id="testing"
                        options={paymentType}
                        getOptionLabel={option => option.name}
                        style={{ width: '210px' }}
                        onChange={(e, value) => setCustomer({
                            ...customer,
                            payment_type: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                label="Pay type"
                                error={error.payment_type ? true : false}
                                helperText={error.payment_type}
                                variant="outlined"
                            />}
                    />
                </div>

                <div id="btn">
                    <button id="button"> Submit </button>
                </div>

            </form>

        </>
    )
}

export default Customer
