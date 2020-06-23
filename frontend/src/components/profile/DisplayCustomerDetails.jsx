import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function DisplayCustomerDetails({ customer, setCustomer, error, setError }) {

    const paymentType = [
        { name: 'Cash' },
        { name: 'Credit' },
        { name: 'Cheque' }
    ]

    const gstType = [
        { name: 'IGST' },
        { name: 'CGST/SGST' }
    ]

    // to display toast notification or success or error
    const successNotification = () => {
        toast.success('Successfully updated the Customer details!', { autoClose: 2500 })
    }

    const updateErrorNotification = () => {
        toast.error('error, cannot update!', { autoClose: 3000 })
    }

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setCustomer({
            ...customer,
            [name]: value
        })
    }

    const handleUpdate = e => {
        e.preventDefault()

        const surity = window.confirm("are you sure? you want to update!")
        if (surity) {
            axios
                .put(`http://127.0.0.1:8000/customer/${customer.id}/`, customer)
                .then(response => {
                    setCustomer(response.data)
                    setError({})
                    successNotification()
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                    updateErrorNotification()
                })
        }
    }


    return (
        <>

            <form onSubmit={e => handleUpdate(e)} className="customer-details">

                <div>
                    <ReusableInput
                        name="name"
                        value={customer.name || ''}
                        label="Company's Name"
                        error={error.name ? true : false}
                        help={error.name}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="date"
                        name="contract_date"
                        value={customer.contract_date || ''}
                        // label="Contract Date"
                        error={error.contract_date ? true : false}
                        help={error.contract_date}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="code"
                        value={customer.code || ''}
                        label="Code"
                        error={error.code ? true : false}
                        help={error.code}
                        onChange={e => handleChange(e)}
                    // style={{marginBottom: '1rem'}}
                    />

                    <ReusableInput
                        type="number"
                        name="contract_no"
                        value={customer.contract_no || ''}
                        label="Contract-No."
                        error={error.contract_no ? true : false}
                        help={error.contract_no}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="attendant"
                        value={customer.attendant || ''}
                        label="Attendant"
                        error={error.attendant ? true : false}
                        help={error.attendant}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="address"
                        value={customer.address || ''}
                        label="Address"
                        error={error.address ? true : false}
                        help={error.address}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="city"
                        value={customer.city || ''}
                        label="City"
                        error={error.city ? true : false}
                        help={error.city}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="pin_code"
                        value={customer.pin_code || ''}
                        label="Pin Code"
                        error={error.pin_code ? true : false}
                        help={error.pin_code}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="state"
                        value={customer.state || ''}
                        label="State"
                        error={error.state ? true : false}
                        help={error.state}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="country"
                        value={customer.country || ''}
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
                        value={customer.e_mail || ''}
                        label="e-Mail"
                        error={error.e_mail ? true : false}
                        help={error.e_mail}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="mobile_no"
                        value={customer.mobile_no || ''}
                        label="Mobile-No"
                        error={error.mobile_no ? true : false}
                        help={error.mobile_no}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        type="number"
                        name="phone_1"
                        value={customer.phone_1 || ''}
                        label="Phone-1"
                        required={false}
                        error={error.phone_1 ? true : false}
                        help={error.phone_1}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="phone_2"
                        value={customer.phone_2 || ''}
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
                        value={customer.gst_no || ''}
                        label="GST No."
                        error={error.gst_no ? true : false}
                        help={error.gst_no}
                        onChange={e => handleChange(e)}
                    />

                    <Autocomplete
                        options={gstType}
                        getOptionLabel={option => option.name}
                        style={{ width: '242px' }}
                        onChange={(e, value) => setCustomer({
                            ...customer,
                            gst_type: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                label="GST-Type"
                                error={error.gst_type ? true : false}
                                helperText={error.gst_type}
                                variant="outlined"
                            />}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="pan_no"
                        value={customer.pan_no || ''}
                        label="Pan-No."
                        error={error.pan_no ? true : false}
                        help={error.pan_no}
                        onChange={e => handleChange(e)}
                        style={{ width: '242px' }}
                    />

                    <Autocomplete
                        options={paymentType}
                        getOptionLabel={option => option.name}
                        style={{ width: '242px' }}
                        onChange={(e, value) => setCustomer({
                            ...customer,
                            payment_type: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                label="Pay-type"
                                error={error.payment_type ? true : false}
                                helperText={error.payment_type}
                                variant="outlined"
                            />}
                    />
                </div>

                <div >
                    <button id="customer-details-update-btn"> Update </button>
                </div>

            </form>

        </>
    )
}

export default DisplayCustomerDetails
