import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import DisplayContracts from './DisplayContracts'
import DisplayCustomerDetails from './DisplayCustomerDetails'


toast.configure()
function CustomerDashboard({ customer, setCustomer, error, setError }) {

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
            <hr /><br /><br />

            <DisplayCustomerDetails
                customer={customer}
                setCustomer={setCustomer}
                error={error}
                setError={setError}
            />

            <br /><br /><hr /><br /><br />

            <DisplayContracts contracts={contracts} />

            <br /><br />

            <div>
                <button id="contract-add" onClick={e => handleCreateContract(e)} > Add Contract </button>
            </div>

        </>
    )
}

export default CustomerDashboard
