import React from 'react'

function DisplayContracts({ contracts }) {

    if ( contracts.length == 0 ) 
        return <h1> No contracts exists </h1>

    return (
        <>
            <table border="1">

                <thead>
                    <tr>
                        <td> origin </td>
                        <td> destination </td>
                        <td> rate </td>
                        <td> extra-charges </td>
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
