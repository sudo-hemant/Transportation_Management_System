import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'

toast.configure()
// for registering client
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

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setCustomer(prev => {
            const newState = { ...prev }
            newState[name] = value
            return newState
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
                    const allErrors = error.response.data
                    // (allErrors) ? setError(allErrors) : {}
                    setError(allErrors)
                    console.log(error.response.data)
                    failedNotification()
                })
        }
    }


    return (
        <>
            <form onSubmit={e => handleSubmit(e)} id="form" >

                <ReusableInput
                    name="name"
                    label="name"
                    error={error.name ? true : false}
                    help={error.name}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="code"
                    label="code"
                    error={error.code ? true : false}
                    help={error.code}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="contract_no"
                    label="contract no"
                    error={error.contract_no ? true : false}
                    help={error.contract_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="contract_date"
                    label=""
                    error={error.contract_date ? true : false}
                    help={error.contract_date}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="attendant"
                    label="attendant"
                    error={error.attendant ? true : false}
                    help={error.attendant}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="address"
                    label="address"
                    error={error.address ? true : false}
                    help={error.address}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="city"
                    label="city"
                    error={error.city ? true : false}
                    help={error.city}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="pin_code"
                    label="pin code"
                    error={error.pin_code ? true : false}
                    help={error.pin_code}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="state"
                    label="state"
                    error={error.state ? true : false}
                    help={error.state}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="country"
                    label="country"
                    error={error.country ? true : false}
                    help={error.country}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="email"
                    name="e_mail"
                    label="e-mail"
                    error={error.e_mail ? true : false}
                    help={error.e_mail}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="mobile_no"
                    label="mobile-no"
                    error={error.mobile_no ? true : false}
                    help={error.mobile_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="phone_1"
                    label="phone-1"
                    required={false}
                    error={error.phone_1 ? true : false}
                    help={error.phone_1}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="phone_2"
                    label="phone-2"
                    required={false}
                    error={error.phone_2 ? true : false}
                    help={error.phone_2}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="gst_no"
                    label="gst no"
                    error={error.gst_no ? true : false}
                    help={error.gst_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="gst_type"
                    label="gst type"
                    error={error.gst_type ? true : false}
                    help={error.gst_type}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="pan_no"
                    label="pan no"
                    error={error.pan_no ? true : false}
                    help={error.pan_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="payment_type"
                    label="payment type"
                    error={error.payment_type ? true : false}
                    help={error.payment_type}
                    onChange={e => handleChange(e)}
                />

                <button> Submit </button>

            </form>
        </>
    )
}

export default Customer
