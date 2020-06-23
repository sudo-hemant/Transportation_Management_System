import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CustomerDashboard from './CustomerDashboard'
import '../../css/profile/CustomerDashboard.css'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


toast.configure()
function CustomerSearch() {

    // to store the name, id of all customers which ll be used to display in drop down
    const [allCustomers, setAllCustomers] = useState([])

    // to store the fetched data of selected customer which ll be 
    // used to display customer dashboard
    const [customer, setCustomer] = useState('')
    const [error, setError] = useState([])

    // to store form data ie, id and name
    const [form, setForm] = useState({})

    // to use this as a conditional statement to render dashboard
    const [displayDashboard, setDisplayDashboard] = useState(   )


    // will fetch the list of all existing customers (ie, name, id)
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/customersname`)
            .then(respose => {
                setAllCustomers(respose.data)
                console.log(respose.data);
            })
    }, [])

    // to handle change of the variable which stores the id, name of selected customer
    const handleChange = (e, value) => {
        e.preventDefault()
        console.log(value);
        setForm({
            ...value
        })
    }

    // to display toast if unable to fetch data of the selected customer
    const failedNotification = () => {
        toast.error('unable to fetch data, Try again!', { autoClose: 2500 })
    }

    // to fetch the data of the selected customer on button click
    const fetchShipperData = e => {
        e.preventDefault()

        const fetch = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/customer/${form.id}`)
                const data = await response.data
                setCustomer(data)
                setDisplayDashboard(true)
                console.log(data)
            } catch {
                failedNotification()
            }
        }
        fetch()
    }


    return (
        <div id="dashboard">

            <div id="header">
                <h1> <i> Select customer to view profile ! </i> </h1>
            </div>

            <br /><hr /><br />

            <div id="dashboard-form">
                <form onSubmit={e => fetchShipperData(e)}>
                    <div>
                        <Autocomplete
                            options={allCustomers}
                            style={{ width: 300 }}
                            getOptionLabel={option => option.name}
                            onChange={(e, value) => handleChange(e, value)}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    required
                                    label="Select Customer"
                                    variant="outlined"
                                />}
                        />
                    </div>

                    <button id="fetch-button"> Fetch  </button>
                </form>
            </div>

            {displayDashboard && <CustomerDashboard
                customer={customer}
                setCustomer={setCustomer}
                error={error}
                setError={setError}
            />}
            
        </div>
    )
}

export default CustomerSearch
