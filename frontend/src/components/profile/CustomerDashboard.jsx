import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


function CustomerDashboard({ customer }) {

    const history = useHistory()

    const [contracts, setContracts] = useState([])

    useEffect(() => {
        const fetchContracts = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/contract/?customer=${customer.id}`)
            const data = await response.data
            setContracts(data)
            console.log(data);
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
            <h1> Details of {customer.name} </h1>
            {
                Object.keys(customer).map( (key, index) => (
                    <p key={index} > {key} : {customer[key]} </p>
                ))
            }

            <h1> Contracts of {customer.name} </h1>
            {
                contracts.map( (contract, key) => (
                    Object.keys(contract).map( (data, index) => (
                        <p key={index}> {data} : {contract[data]} </p>
                    ))
                ))
            }

            <button onClick={e => handleCreateContract(e) } > Add Contract </button>
        </>
    )
}

export default CustomerDashboard
