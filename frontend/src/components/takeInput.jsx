import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'


function TakeInput() {

    const history = useHistory()

    // to handle data coming from bill model which is used for entry of particular data
    const [data, setData] = useState({
        e_way_bill_no: 0,
        date: '',
        origin: '',
        destination: '',
        shipper: '',
        consignee: '',
        mode: '',
        flight_no: '',
        pieces: 0,
        actual_weight: 0,
        payment_mode: '',
        rate_per_kg: 0,
        declared_value: 0,
        weight_charges: 0,
        other_charges: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        total_charges: 0,
    })

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post('http://127.0.0.1:8000/bill/', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // history.push('/list')
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


    return (
        <div id="input-form">

            <form onSubmit={e => handleSubmit(e)} >

                <div id="input-box">
                    <TextField
                        type="number"
                        name="e_way_bill_no"
                        label="E-Way Bill No"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)} />
                </div>

                <div id="input-box">
                    <TextField
                        type="date"
                        name="date"
                        // label="Date"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="text"
                        name="origin"
                        label="origin"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="text"
                        name="destination"
                        label="destination"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="text"
                        name="shipper"
                        label="shipper"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box" >
                    <TextField
                        type="text"
                        name="consignee"
                        label="consignee"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="text"
                        name="mode"
                        label="mode"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="text"
                        name="flight_no"
                        label="flight No"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="pieces"
                        label="pieces"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="actual_weight"
                        label="actualWeight"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>


                <div id="input-box">
                    <TextField
                        type="number"
                        name="ratePerKg"
                        label="ratePerKg"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="text"
                        name="payment_mode"
                        label="Payment Mode"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)} />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="declared_value"
                        label="Declared Value"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)} />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="weight_charges"
                        label="Weight Charges"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="other_charges"
                        label="Other Charges"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="igst"
                        label="igst"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="cgst"
                        label="cgst"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="sgst"
                        label="sgst"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div id="input-box">
                    <TextField
                        type="number"
                        name="total_charges"
                        label="Total Charges"
                        variant="outlined"
                        id="outlined-basic"
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <Button id="submit-but" variant="contained" color="primary" onClick={e => handleSubmit(e)} > submit </Button>
                </div>

            </form >

        </div >
    )
}

export default TakeInput
