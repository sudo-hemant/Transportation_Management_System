import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import UpdateInputBox from './updateInputBox';


function DetailData(props) {

    // to store the fetched data
    const [current, setCurrent] = useState([])
    // to store the data to be updated  
    const [update, setUpdate] = useState([])
    // to fetch any variable part of the url by their name as given by us
    const { id } = useParams()

    // to load data on id change or page load
    useEffect(() => {
        const fetchInvoiceDetail = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/bill/${id}`)
            const data = await response.data
            setCurrent(data)
            setUpdate(data)
        }
        fetchInvoiceDetail()
    }, [])

    // to update data in database as requested by user
    const handleUpdate = e => {
        e.preventDefault()
        axios
            .put(`http://127.0.0.1:8000/bill/${id}/`, update)
            .then(response => {
                setCurrent(response.data)
            })
            .catch(err => console.log(err))
    }

    const handleDelete = e => {
        e.preventDefault()
        axios
            .delete(`http://127.0.0.1:8000/bill/${id}`)
            .then( res => console.log(res.data))
            .catch( err => {
                throw err.response.data
            })
    }

    // to handle the change in the input box
    const handleInputChange = e => {
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

            <p> bill no : {current.e_way_bill_no} </p>
            <p> date : {current.date} </p>
            <p> origin : {current.origin} </p>
            <p> destination : {current.destination} </p>
            <p> shipper : {current.shipper} </p>
            <p> consignee : {current.consignee} </p>
            <p> mode : {current.mode} </p>
            <p> flight No : {current.flight_no} </p>
            <p> pieces : {current.pieces} </p>
            <p> weight : {current.actual_weight} </p>
            <p> payment mode : {current.payment_mode} </p>
            <p> rate : {current.rate_per_kg} </p>
            <p> declared value : {current.declared_value} </p>
            <p> weight charges : {current.weight_charges} </p>
            <p> other charges : {current.other_charges} </p>
            <p> igst : {current.igst} </p>
            <p> cgst : {current.cgst} </p>
            <p> sgst : {current.sgst} </p>
            <p> amount : {current.total_charges} </p>
            <hr />
            

            <form onSubmit={e => handleUpdate(e)} >

                <UpdateInputBox
                    type="number"
                    name="e_way_bill_no"
                    value={update.e_way_bill_no || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="date"
                    value={update.date || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="origin"
                    value={update.origin || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="destination"
                    value={update.destination || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="shipper"
                    value={update.shipper || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="consignee"
                    value={update.consignee || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="mode"
                    value={update.mode || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="flight_no"
                    value={update.flight_no || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="pieces"
                    value={update.pieces || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="actual_weight"
                    value={update.actual_weight || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="rate_per_kg"
                    value={update.rate_per_kg || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="text"
                    name="payment_mode"
                    value={update.payment_mode || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="declared_value"
                    value={update.declared_value || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="weight_charges"
                    value={update.weight_charges || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="other_charges"
                    value={update.other_charges || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="igst"
                    value={update.igst || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="cgst"
                    value={update.cgst || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="sgst"
                    value={update.sgst || ''}
                    onChange={e => handleInputChange(e)}
                />

                <UpdateInputBox
                    type="number"
                    name="total_charges"
                    value={update.total_charges || ''}
                    onChange={e => handleInputChange(e)}
                />

                <button> Update </button>
            </form>

            <button onClick={e => handleDelete(e)} > Delete </button>

        </>
    )
}

export default DetailData
