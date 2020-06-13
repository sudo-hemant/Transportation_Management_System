import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import SearchFilter from './searchFilter'


function ListData() {

    const [datas, setData] = useState([])
    const history = useHistory()
    
    // loading list of data on page load
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/bill`)
            .then( response => setData(response.data) )
            .catch( error => console.log(error) )
    }, [])

    // for viewing the details of any data
    const handleDetailView = (e, id) => {
        e.preventDefault()
        // history.push(`detail/${id}`)
        history.push({
            pathname: `/detail/${id}`,
            state: { id }
        })
    }


    return (
        <div>

            {/* for filtering the data according to user's need */}
            <SearchFilter setData={ setData } />

            <table border="3" >

                <thead>
                    <tr>
                        <th> E-Way Bill No </th>
                        <th> Date </th>
                        <th> Origin </th>
                        <th> Destination </th>
                        <th> shipper </th>
                        <th> Consignee </th>
                        <th> Pieces </th>
                        <th> Weight </th>
                        <th> Amount </th>
                        <th>  </th>
                    </tr>
                </thead>

                <tbody>
                    {datas.map(data => (
                        <tr key={ data.id }>
                            
                            <td> { data.e_way_bill_no } </td>
                            <td> { data.date  } </td>
                            <td> { data.origin } </td>
                            <td> { data.destination } </td>
                            <td> { data.shipper } </td>
                            <td> { data.consignee } </td>
                            <td> { data.pieces } </td>
                            <td> { data.actual_weight } </td>
                            <td> { data.total_charges } </td>
                            <td>
                                <button onClick={ e => handleDetailView(e, data.id) } > See Details </button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default ListData
