import React from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import Nav from "./components/nav"
import Customer from './components/profile/customer'
import CustomerSearch from "./components/profile/CustomerSearch"
import CreateContract from "./components/profile/CreateContract"
import TakeInput from "./components/takeInput"
import ListData from "./components/list/listData"
import DetailData from "./components/detail/detailData"
import GenerateBill from './components/bill/GenerateBill'
import FetchBill from './components/bill/FetchBill'

// import GlobalProvider from "./context/globalState";
// import CustomerProfile from "./components/profile/customerProfile";

function App() {
  
  const { pathname } = useLocation() // to fetch url

  return (
    <>      
      <Link to="/">home | </Link> <br/> <hr/>
      {/* <p> current location :- {pathname} </p> */}

      <Switch>
        <Route path="/customer" component={Customer} />
        <Route path="/customersearch" component={CustomerSearch} />
        <Route path="/createcontract" component={CreateContract} />

        <Route path="/add" component={TakeInput} /> 
        <Route path="/list" component={ListData} />
        <Route path="/detail/:id" exact component={DetailData} />

        <Route path="/createbill" component={GenerateBill} />
        <Route path="/fetchbill" component={FetchBill} />

        <Route path="/" exact component={Nav} />


        {/* <GlobalProvider>
          <Route path="/profile" component={CustomerProfile} />
        </GlobalProvider> */}

        <Route render={() => <h1>error 404! Not Found</h1>} />
      </Switch>

    </>
  );
}

export default App;
