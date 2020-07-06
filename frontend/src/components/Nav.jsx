import React from 'react'
import { Link } from 'react-router-dom';


function Nav() {
    
    return (
        <>
            <Link to="/customer"> customer registration </Link> {"  |  "} 
            <Link to="/customersearch" > customer dashboard </Link> {"  |  "}
            <Link to="/add"> add new data </Link> {"  |  "}
            <Link to="/list"> history </Link> {"  |  "}
            <Link to="/createbill" > Generate Bill </Link> {"  |  "}
            <Link to="/billsummary" > Fetch Bill summary </Link> {"  |  "}

        </>
    )
}

export default Nav
