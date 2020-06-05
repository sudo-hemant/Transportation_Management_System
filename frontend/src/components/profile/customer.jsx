import React, { useState } from 'react'
import axios from 'axios'


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

    // to register our new customer
    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post(`http://127.0.0.1:8000/customer/`, customer)
            .then(res => console.log(res))
            .catch(res => console.log(res))
    }


    return (
        <>

            <form onSubmit={ e => handleSubmit(e) }>
                <input type="text" name="name" onChange={e => handleChange(e)} />
                <input type="text" name="code" onChange={e => handleChange(e)} />
                <input type="text" name="contract_no" onChange={e => handleChange(e)} />
                <input type="date" name="contract_date" onChange={e => handleChange(e)} />
                <input type="text" name="attendant" onChange={e => handleChange(e)} />
                <input type="text" name="address" onChange={e => handleChange(e)} />
                <input type="text" name="city" onChange={e => handleChange(e)} />
                <input type="text" name="pin_code" onChange={e => handleChange(e)} />
                <input type="text" name="state" onChange={e => handleChange(e)} />
                <input type="text" name="country" onChange={e => handleChange(e)} />
                e<input type="email" name="e_mail" onChange={e => handleChange(e)} />
                <input type="text" name="mobile_no" onChange={e => handleChange(e)} />
                <input type="text" name="phone_1" onChange={e => handleChange(e)} />
                <input type="text" name="phone_2" onChange={e => handleChange(e)} />
                <input type="text" name="gst_no" onChange={e => handleChange(e)} />
                <input type="text" name="gst_type" onChange={e => handleChange(e)} />
                <input type="text" name="pan_no" onChange={e => handleChange(e)} />
                <input type="text" name="payment_type" onChange={e => handleChange(e)} />

                <button> submit </button>
            </form>

        </>
    )
}

export default Customer
