import React, { useState, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function DetailData() {

    const history = useHistory()
    const { state } = useLocation()

    // to store the fetched data
    // const [current, setCurrent] = useState([])

    // to store the data to be updated  
    const [update, setUpdate] = useState([])

    const [error, setError] = useState({})

    const id = state.id

    // to fetch any variable part of the url by their name as given by us
    // const { id } = useParams()

    // to load data on id change or page load
    useEffect(() => {
        const fetchInvoiceDetail = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/bill/${id}`)
            const data = await response.data
            // setCurrent(data)
            setUpdate(data)
            console.log(data);
        }
        fetchInvoiceDetail()
    }, [])


    // toast notifications
    const updateNotification = () => {
        toast.success('Successfully updated!', { autoClose: 3000 })
    }

    const deletedNotification = () => {
        toast.success('Successfully deleted!', { autoClose: 3000 })
    }

    const updateErrorNotification = () => {
        toast.error('error, cannot update', { autoClose: 2000 })
    }

    const errorDeletionNotification = () => {
        toast.error('error occured while deletion!', { autoClose: 2500 })
    }


    // to update data in database as requested by user
    const handleUpdate = e => {
        e.preventDefault()
        const surity = window.confirm("Are you sure, you want to update?")
        if (surity) {
            axios
                .put(`http://127.0.0.1:8000/bill/${id}/`, update)
                .then(response => {
                    updateNotification()
                    setUpdate(response.data)
                    // setCurrent(response.data)
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                    updateErrorNotification()
                    console.log(error)
                })
        }
    }

    const handleDelete = e => {
        e.preventDefault()
        const surity = window.confirm("Are you sure you want to dele?")
        if (surity) {
            axios
                .delete(`http://127.0.0.1:8000/bill/${id}`)
                .then(res => {
                    deletedNotification()
                    console.log(res.data)
                    history.goBack()
                })
                .catch(error => {
                    errorDeletionNotification()
                    console.log(error)
                })
        }
    }

    // to handle the change in the input box
    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setUpdate(prev => {
            const newstate = { ...prev }
            newstate[name] = value
            return newstate
        })
    }


    return (
        <>
            <h1>Detail view</h1> <hr />

            <form onSubmit={e => handleUpdate(e)} >

                <ReusableInput
                    type="number"
                    name="e_way_bill_no"
                    value={update.e_way_bill_no || ''}
                    label="E-Way Bill No"
                    error={error.e_way_bill_no ? true : false}
                    help={error.e_way_bill_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="date"
                    name="date"
                    value={update.date || ''}
                    label="Date"
                    error={error.date ? true : false}
                    help={error.date}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="shipper"
                    value={update.shipper || ''}
                    label="Shipper"
                    error={error.shipper ? true : false}
                    help={error.shipper}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="consignee"
                    value={update.consignee || ''}
                    label="Consignee"
                    error={error.consignee ? true : false}
                    help={error.consignee}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="origin"
                    value={update.origin || ''}
                    label="Origin"
                    error={error.origin ? true : false}
                    help={error.origin}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="destination"
                    value={update.destination || ''}
                    label="Destination"
                    error={error.destination ? true : false}
                    help={error.destination}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    required={false}
                    name="mode"
                    value={update.mode || ''}
                    label="mode"
                    error={error.mode ? true : false}
                    help={error.mode}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    required={false}
                    name="flight_no"
                    value={update.flight_no || ''}
                    label="flight No"
                    error={error.flight_no ? true : false}
                    help={error.flight_no}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="pieces"
                    value={update.pieces || ''}
                    label="pieces"
                    error={error.pieces ? true : false}
                    help={error.pieces}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="actual_weight"
                    value={update.actual_weight || ''}
                    label="actualWeight"
                    error={error.actual_weight ? true : false}
                    help={error.actual_weight}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="ratePerKg"
                    value={update.rate_per_kg || ''}
                    label="rate"
                    error={error.rate_per_kg ? true : false}
                    help={error.rate_per_kg}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    required={false}
                    name="payment_mode"
                    value={update.payment_mode || ''}
                    label="Payment Mode"
                    error={error.payment_mode ? true : false}
                    help={error.payment_mode}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="declared_value"
                    value={update.declared_value || ''}
                    label="Declared Value"
                    error={error.declared_value ? true : false}
                    help={error.declared_value}
                    onChange={e => handleChange(e)} />

                <ReusableInput
                    type="number"
                    name="weight_charges"
                    value={update.weight_charges || ''}
                    label="Weight Charges"
                    error={error.weight_charges ? true : false}
                    help={error.weight_charges}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="other_charges"
                    value={update.other_charges || ''}
                    label="Other Charges"
                    error={error.other_charges ? true : false}
                    help={error.other_charges}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="igst"
                    value={update.igst || ''}
                    label="igst"
                    error={error.igst ? true : false}
                    help={error.igst}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="cgst"
                    value={update.cgst || ''}
                    label="cgst"
                    error={error.cgst ? true : false}
                    help={error.cgst}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="sgst"
                    value={update.sgst || ''}
                    label="sgst"
                    error={error.sgst ? true : false}
                    help={error.sgst}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="total_charges"
                    value={update.total_charges || ''}
                    label="Total Charges"
                    error={error.total_charges ? true : false}
                    help={error.total_charges}
                    onChange={e => handleChange(e)}
                />

                <button> Update </button>

            </form>

            <button onClick={e => handleDelete(e)} > Delete </button>

        </>
    )
}

export default DetailData
