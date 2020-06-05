import React, { useState, useContext } from 'react'

import {globalContext} from '../../context/globalState'

function CustomerProfile() {

    const [profile, setprofile] = useState('')

    const { test } = useContext(globalContext)

    return (
        <>
            {console.log(test)}
            {/* {console.log(context.state.surname)} */}
            hello
        </>
    )   
}

export default CustomerProfile
