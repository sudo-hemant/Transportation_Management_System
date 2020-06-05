import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CustomerDashboard from './CustomerDashboard'


function CustomerSearch() {

    // to store the name, id of all customers which ll be used to display in drop down
    const [allCustomers, setAllCustomers] = useState([])
    // to store the fetched data of selected customer
    const [customer, setCustomer] = useState('')
    // to store form data
    const [form, setForm] = useState({
        name: '',
        id: ''
    })
    // to use this as a conditional statement to render dashboard
    const [displayDashboard, setDisplayDashboard] = useState(false)

    // will fetch the list of all existing customers (ie, name, id)
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/customersname`)
            .then(res => {
                setAllCustomers(res.data)
                console.log(res.data);
            })
    }, [])

    const handleChange = e => {
        e.preventDefault()
        const value = e.target.value.split('.')[0] - 1
        setForm({
            ...form, 
            ...allCustomers[value] 
        })
        console.log(allCustomers[value])
    }

    const fetchShipperData = e => {
        e.preventDefault()

        const fetch = async() => {
            const response = await axios.get(`http://127.0.0.1:8000/customer/${form.id}`)
            const data = await response.data
            setCustomer(data)
            setDisplayDashboard(true)
            console.log(data);
        }
        fetch()
    }

    return (
        <>
            <h1> Select customer to view profile </h1>
            <form onSubmit={e => fetchShipperData(e)}>
                <select name="name" onChange={e => handleChange(e)} >
                    <option></option>
                    {
                        allCustomers.map( (customer, key) => (
                            <option key={key} name="h" >
                                {key + 1 + ". " + customer.name}
                            </option>
                        ))
                    }
                </select>
                <button> fetch  </button>
            </form>

            { displayDashboard && <CustomerDashboard customer={customer} /> }
        </>
    )
}

export default CustomerSearch
