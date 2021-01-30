import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReusableInput from '../ReusableInput'
import '../../css/profile/CustomerDashboard.css'


toast.configure()
function EditContract() {

    const { state } = useLocation()
    const history = useHistory()

    const [contract, setContract] = useState({})
    const [error, setError] = useState({})

    const id = state.id

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/contract/${id}`)
            .then(response => {
                setContract(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    const updateNotification = () => {
        toast.success('Successfully updated!', { autoClose: 3000 })
    }

    const updateErrorNotification = () => {
        toast.error('error, cannot update', { autoClose: 2000 })
    }

    const deletedNotification = () => {
        toast.success('Successfully deleted!', { autoClose: 3000 })
    }

    const errorDeletionNotification = () => {
        toast.error('error occured while deletion!', { autoClose: 2500 })
    }

    const handleContractUpdate = e => {
        e.preventDefault()
        const surity = window.confirm("Are you sure, you want to update ?")
        if (surity) {
            axios
                .put(`http://127.0.0.1:8000/contract/${id}/`, contract)
                .then(response => {
                    setContract(response.data)
                    setError({})
                    updateNotification()
                })
                .catch(error => {
                    (error.response) ? setError(error.response.data) : setError({})
                    updateErrorNotification()
                    console.log(error)
                })
        }
    }

    const handleContractDelete = e => {
        e.preventDefault()
        const surity = window.confirm("Are you sure, you want to delete contract ?")
        if (surity) {
            axios
                .delete(`http://127.0.0.1:8000/contract/${id}`)
                .then(response => {
                    history.goBack()
                    deletedNotification()
                    console.log(response)
                })
                .catch(error => {
                    errorDeletionNotification()
                    console.log(error)
                })
        }
    }

    const handleChange = e => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setContract({
            ...contract,
            [name]: value
        })
    }


    return (
        <>
            <p id="edit-contract-header"> Edit Contract </p>

            <form className="edit-contract" onSubmit={e => handleContractUpdate(e)}>
                <div>
                    <ReusableInput
                        name="origin"
                        label="origin"
                        value={contract.origin || ''}
                        error={error.origin ? true : false}
                        help={error.origin}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="destination"
                        label="destination"
                        value={contract.destination || ''}
                        error={error.destination ? true : false}
                        help={error.destination}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <ReusableInput
                        name="rate"
                        label="rate"
                        value={contract.rate || ''}
                        error={error.rate ? true : false}
                        help={error.rate}
                        onChange={e => handleChange(e)}
                    />

                    <ReusableInput
                        name="extra_charges"
                        label="extra charges"
                        value={contract.extra_charges || ''}
                        error={error.extra_charges ? true : false}
                        help={error.extra_charges}
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <button id="update-contract-btn"> Update </button>
                </div>
            </form>

            <div className="delete-contract">
                <button id="delete-contract-btn" onClick={e => handleContractDelete(e)}> Delete </button>
            </div>

        </>
    )
}

export default EditContract
