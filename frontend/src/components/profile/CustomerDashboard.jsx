import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import DisplayContracts from './DisplayContracts'


toast.configure()
function CustomerDashboard({ customer }) {

    const history = useHistory()

    const [contracts, setContracts] = useState([])

    const failedNotification = () => {
        toast.error('unable to fetch the contracts!', { autoClose: 2500 })
    }

    // to fetch contacts
    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/contract/?customer=${customer.id}`)
                const data = await response.data
                setContracts(data)
                console.log(data);
            }
            catch {
                failedNotification()
            }
        }
        fetchContracts()
    }, [customer.name])

    // to redirect to createcontract page
    const handleCreateContract = e => {
        e.preventDefault()
        history.push({
            pathname: '/createcontract',
            state: {
                id: customer.id
            }
        })
    }

    return (
        <>
            {/* TODO -- change UI */}
            <h1> Details of {customer.name} </h1>
            {
                Object.keys(customer).map((key, index) => (
                    <p key={index} > {key} : {customer[key]} </p>
                ))
            }

            <hr /><hr />

            <DisplayContracts contracts={contracts} />

            <button onClick={e => handleCreateContract(e)} > Add Contract </button>
        </>
    )
}

export default CustomerDashboard
