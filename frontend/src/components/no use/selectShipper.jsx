// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import axios from 'axios'

// import Bill from './bill'


// function SelectShipper() {

//     const [search, setSearch] = useState('')    // to store value of searh box
//     const [shipper, setshipper] = useState([])  // to store name of selected shipper
//     const history = useHistory()                // to help in url navigation

//     // to fetch data of requested shipper
//     const handleGenerateBill = async e => {
//         e.preventDefault()

//         const response = await axios.get(`http://127.0.0.1:8000/bill/?shipper=${search}`)
//         setshipper( response.data )

//         // not working --
//         // history.push('/')
//     }

//     // changing value of input tag on each key press
//     const handleChange = e => {
//         setSearch(e.target.value)
//     }


//     return (
//         <>
//             {/* for letting user to select the shipper - to generate the bill */}
//             <form onSubmit={ e => handleGenerateBill(e) } > 
//                 Shipper : <input type="text" name="shipper" onChange={ e => handleChange(e) } />
//                 <button> submit </button>
//             </form>

//             {/* to display data of shipper to generate bill */}
//             <Bill shipper={shipper} /> 

//         </>
//     )
// }

// export default SelectShipper
