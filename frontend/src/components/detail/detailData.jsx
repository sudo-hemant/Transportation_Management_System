import React, { useState, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'
import '../../css/detail.css'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function DetailData() {

    const history = useHistory()
    const { state } = useLocation()

    const id = state.id

    // to store the data to be updated  
    const [update, setUpdate] = useState([])
    const [error, setError] = useState({})

    // storing name of all existing clients for prediction in shipper
    const [existingCustomers, setExistingCustomers] = useState([])

    const [selectedShipper, setSelectedShipper] = useState(null)
    const [selectedMode, setSelectedMode] = useState(null)
    const [selectedPaymentMode, setSelectedPaymentMode] = useState(null)

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
            .get(`http://127.0.0.1:8000/bill/${id}`)
            .then(response => {
                const data = response.data
                console.log(data)
                setUpdate(data)
                setSelectedShipper({
                    name: data.shipper
                })
                setSelectedMode({
                    name: data.mode
                })
                setSelectedPaymentMode({
                    name: data.payment_mode
                })

                return axios.get(`http://127.0.0.1:8000/customersname`)
            })
            .then(response => {
                setExistingCustomers(response.data)
                console.log(response.data)
            })

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


    // const [update, setUpdate] = useState([])
    // const [selectedMode, setSelectedMode] = useState([{ name: '' }])
    // const [selectedMode, setSelectedMode] = useState({ name: '' })
    // const mode = [
    //     { name: 'Air' },
    //     { name: 'Train' },
    //     { name: 'Surface' }
    // ]
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     // const test = async() => {
    //     //     const response = await axios.get(`http://127.0.0.1:8000/bill/${id}`)
    //     //     const data = await response.data
    //     //     setUpdate(data)
    //     //     setSelectedMode([{ ...setSelectedMode, name: data.mode }])
    //     //     console.log(selectedMode)
    //     //     console.log(data)
    //     // }
    //     // test()
    //     axios
    //         .get(`http://127.0.0.1:8000/bill/${id}`)
    //         .then(response => {
    //             const data = response.data
    //             setUpdate(data)
    //             // setSelectedMode([{ name: data.mode }])
    //             setSelectedMode({ name: data.mode })
    //             setLoading(false)
    //         })
    // }, [])

    return (
        <>
            <p id="detail-view-heading"> Detail View </p>

            <form className="detail-view" onSubmit={e => handleUpdate(e)} >

                <div>
                    <ReusableInput
                        type="number"
                        name="doc_no"
                        label="Doc No."
                        value={update.doc_no || ''}
                        error={error.doc_no ? true : false}
                        help={error.doc_no}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="date"
                        name="date"
                        label="Date"
                        value={update.date || ''}
                        error={error.date ? true : false}
                        help={error.date}
                        onChange={e => handleChange(e)}
                    />

                    <Autocomplete
                        style={{ width: "240px" }}
                        freeSolo
                        value={selectedShipper}
                        options={existingCustomers}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setUpdate({
                            ...update,
                            shipper: value ? value.name : ''
                        })}
                        renderInput={params =>
                            <TextField
                                {...params}
                                required
                                name="shipper"
                                label="Shipper"
                                onChange={e => handleChange(e)}
                                error={error.shipper ? true : false}
                                helperText={error.shipper}
                                variant="outlined"
                            />}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="consignee"
                        label="Consignee"
                        value={update.consignee || ''}
                        error={error.consignee ? true : false}
                        help={error.consignee}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="origin"
                        label="Origin"
                        value={update.origin || ''}
                        error={error.origin ? true : false}
                        help={error.origin}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="destination"
                        label="Destination"
                        value={update.destination || ''}
                        error={error.destination ? true : false}
                        help={error.destination}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <Autocomplete
                        style={{ width: '240px' }}
                        freeSolo
                        value={selectedMode}
                        options={mode}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setUpdate({
                            ...update,
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
                        value={update.flight_no || ''}
                        error={error.flight_no ? true : false}
                        help={error.flight_no}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="pieces"
                        label="Pieces"
                        value={update.pieces || ''}
                        error={error.pieces ? true : false}
                        help={error.pieces}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="weight"
                        label="Weight"
                        value={update.weight || ''}
                        error={error.weight ? true : false}
                        help={error.weight}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="rate"
                        label="Rate"
                        value={update.rate || ''}
                        error={error.rate ? true : false}
                        help={error.rate}
                        onChange={e => handleChange(e)}
                    />

                    <Autocomplete
                        style={{ width: '240px' }}
                        freeSolo
                        value={selectedPaymentMode}
                        options={paymentMode}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setUpdate({
                            ...update,
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
                        value={update.weight_charges || ''}
                        error={error.weight_charges ? true : false}
                        help={error.weight_charges}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        type="number"
                        name="other_charges"
                        label="Other Charges"
                        value={update.other_charges || ''}
                        error={error.other_charges ? true : false}
                        help={error.other_charges}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="total_charges"
                        label="Total Charges"
                        value={update.total_charges || ''}
                        error={error.total_charges ? true : false}
                        help={error.total_charges}
                        onChange={e => handleChange(e)}
                    />
                </div>


                <div>
                    <button id="update-btn"> Update </button>
                </div>

            </form>

            <div id="delete-btn-div">
                <button id="delete-btn" onClick={e => handleDelete(e)} > Delete </button>
            </div>

        </>
    )
}

export default DetailData
