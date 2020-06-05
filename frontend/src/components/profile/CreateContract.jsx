import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'


// to let company register all the contracts with it's customer
function CreateContract() {

    const history = useHistory()
    const { state } = useLocation()

    // for storing data of input form 
    const [contract, setcontract] = useState({
        origin: '',
        destination: '',
        rate: 0,
        extra_charges: 0,
        customer: state.id
    })

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setcontract(prev => {
            const newState = { ...prev }
            newState[name] = value
            return newState
        })
    }

    // to post form data to register contract with the client by linking client id with it
    const handleSubmit = e => {
        e.preventDefault()

        const create = async() => {
            const response = await axios.post(`http://127.0.0.1:8000/contract/`, contract)
            const staus = response.status
        }
        create()
        history.goBack()
    }


    return (
        <>
            <form onSubmit={e => handleSubmit(e)} >
                
                origin : 
                <input type="text" name="origin" value={contract.origin} onChange={e => handleChange(e)} /> <br/>
                
                destination : 
                <input type="text" name="destination" value={contract.destination} onChange={e => handleChange(e)} /> <br/>
                
                rate : 
                <input type="number" name="rate" value={contract.rate} onChange={e => handleChange(e)} /> <br/>
                
                extra charges : 
                <input type="number" name="extra_charges" value={contract.extra_charges} onChange={e => handleChange(e)} /> <br/>
                
                <button> submit </button> <br/>
            </form>

        </>
    )
}

export default CreateContract
