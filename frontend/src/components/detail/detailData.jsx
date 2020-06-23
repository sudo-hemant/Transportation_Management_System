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
                    setUpdate(response.data)
                    setError({})
                    updateNotification()
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                    updateErrorNotification()
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
        setUpdate({
            ...update,
            [name]: value
        })
    }


    return (
        <>
            <h1>Detail view</h1> <hr />

            <form onSubmit={e => handleUpdate(e)} >

                <ReusableInput
                    type="number"
                    name="doc_no"
                    value={update.doc_no || ''}
                    label="Doc No."
                    error={error.doc_no ? true : false}
                    help={error.doc_no}
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
                    name="weight"
                    value={update.weight || ''}
                    label="Weight"
                    error={error.weight ? true : false}
                    help={error.weight}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="rate"
                    value={update.rate || ''}
                    label="Rate"
                    error={error.rate ? true : false}
                    help={error.rate}
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
