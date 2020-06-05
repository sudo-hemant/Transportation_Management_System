// import React from 'react'


// // to display data of the selected shipper
// function Bill({ shipper }) {

//     if ( shipper.length === 0 ) {
//         return <h3> No Data to Display </h3>
//     }
//     return (
//         <>
//             <table>

//                 <thead>
//                     <tr>
//                         <td> e-way bill no  </td>
//                         <td> Date </td>
//                         <td> shipper </td>
//                         <td> Consignee </td>
//                         <td> origin </td>
//                         <td> destination </td>
//                         <td> pieces </td>
//                         <td> weight </td>
//                         <td> rate </td>
//                         <td> amount </td>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     { shipper.map( data => (
//                         <tr key={ data.id } >

//                             <td> { data.e_way_bill_no } </td>
//                             <td> { data.date } </td>
//                             <td> { data.shipper } </td>
//                             <td> { data.consignee  } </td>
//                             <td> { data.origin } </td>
//                             <td> { data.destination  } </td>
//                             <td> { data.pieces  } </td>
//                             <td> { data.actual_weight  } </td>
//                             <td> { data.rate_per_kg } </td>
//                             <td> { data.total_charges } </td>

//                         </tr>
//                     ))}
//                 </tbody>
                
//             </table>
//         </>
//     )
// }

// export default Bill
