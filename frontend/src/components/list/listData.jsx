import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import SearchFilter from './searchFilter'
import '../../css/history.css'


function ListData() {

    const history = useHistory()

    const [datas, setData] = useState([])
    
    // // loading list of data on page load
    // useEffect(() => {
    //     axios
    //         .get(`http://127.0.0.1:8000/bill`)
    //         .then(response => setData(response.data) )
    //         .catch(error => console.log(error) )
    // }, [])

    // for viewing the details of any data
    const handleDetailView = (e, id) => {
        e.preventDefault()
        history.push({
            pathname: `/detail/${id}`,
            state: { id }
        })
    }


    return (
        <div>
            <p id="filter"> Filter </p>

            <SearchFilter setData={ setData } /> <hr/>
            
            <table border="1" id="history-table" >

                <caption id="caption"> Last few transactions </caption>

                <thead>
                    <tr>
                        <th> Doc No. </th>
                        <th> Date </th>
                        <th> Origin </th>
                        <th> Destination </th>
                        <th> shipper </th>
                        <th> Consignee </th>
                        <th> Pcs </th>
                        <th> Weight </th>
                        <th> Amount </th>
                        <th>  </th>
                    </tr>
                </thead>

                <tbody>
                    {datas.map(data => (
                        <tr key={ data.id }>
                            
                            <td> { data.doc_no } </td>
                            <td> { data.date  } </td>
                            <td> { data.origin } </td>
                            <td> { data.destination } </td>
                            <td> { data.shipper } </td>
                            <td> { data.consignee } </td>
                            <td> { data.pieces } </td>
                            <td> { data.weight } </td>
                            <td> { data.total_charges } </td>
                            <td>
                                <button id="detail-btn" onClick={ e => handleDetailView(e, data.id) } > See Details </button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default ListData
