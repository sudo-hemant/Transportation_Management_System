import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'


// to let company register all the contracts with it's customer
toast.configure()
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

    // to store error occured in form 
    const [error, setError] = useState({})


    // to handle change in any input field in form
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

    // toast notifications
    const successNotification = () => {
        toast.success('Successfully created the contract', { autoClose: 2500 })
    }
    const failedNotification = () => {
        toast.error('Some error occured', { autoClose: 2000 })
    }

    // to post form data to register contract with the client by linking client id with it
    const handleSubmit = e => {
        e.preventDefault()

        const create = async () => {
            axios
                .post(`http://127.0.0.1:8000/contract/`, contract)
                .then(response => {
                    setError({})
                    successNotification()
                    history.goBack()
                    console.log(response)
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                    failedNotification()
                    console.log(error)
                })
        }
        const surity = window.confirm("Are you sure?")
        if (surity) 
            create()
    }


    return (
        <>
            <form onSubmit={e => handleSubmit(e)} >

                <ReusableInput
                    name="origin"
                    label="origin"
                    error={error.origin ? true : false}
                    help={error.origin}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    name="destination"
                    label="destination"
                    error={error.destination ? true : false}
                    help={error.destination}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="rate"
                    label="rate"
                    error={error.rate ? true : false}
                    help={error.rate}
                    onChange={e => handleChange(e)}
                />

                <ReusableInput
                    type="number"
                    name="extra_charges"
                    label="extra charges"
                    error={error.extra_charges ? true : false}
                    help={error.extra_charges}
                    onChange={e => handleChange(e)}
                />

                <button> submit </button> <br />

            </form>
        </>
    )
}

export default CreateContract
