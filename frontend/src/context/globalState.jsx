import React, { useReducer, createContext } from 'react'
import reducer from '../context/reducer'

const initialState = {
    origin: '',
    code: '',
    name: '',
    attendant: '',
    address: '',
    pincode: '',
    city: '',
    phone1: '',
    phone2: '',
    mobile: '',
    e_mail: '',
    gst_no: '',
    gst_type: '',
    pan_no: '',
    type: '',
    shipper: ''
}
export const globalContext = createContext(initialState)

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <globalContext.Provider value={{ test: state.test }} >
            { children }
        </globalContext.Provider>
    )
}

export default GlobalProvider


