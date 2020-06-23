import React from 'react'

function DisplayContracts({ contracts }) {

    if ( contracts.length == 0 ) 
        return <p id="no-contract"> No contracts exist </p>

    return (
        <>
            <table border="1" className="contracts-table" >

                <caption id="table-caption"> All Contracts </caption>

                <thead>
                    <tr>
                        <th> ORIGIN </th>
                        <th> DESTINATION </th>
                        <th> RATE </th>
                        <th> EXTRA-CHARGES </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        contracts.map( (contract, key) => (
                            <tr key={key}>
                                <td> {contract.origin} </td>
                                <td> {contract.destination} </td>
                                <td> {contract.rate} </td>
                                <td> {contract.extra_charges} </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </>
    )
}

export default DisplayContracts
