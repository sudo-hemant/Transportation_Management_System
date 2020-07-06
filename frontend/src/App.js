import React from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import Nav from "./components/Nav"
import Customer from './components/profile/customer'
import CustomerSearch from "./components/profile/CustomerSearch"
import CreateContract from "./components/profile/CreateContract"
import TakeInput from "./components/takeInput"
import ListData from "./components/list/listData"
import DetailData from "./components/detail/detailData"
import GenerateBill from './components/bill/GenerateBill'
import BillSummary from './components/bill/BillSummary'
import Bill from './components/bill/Bill'
import EditContract from "./components/profile/EditContract"

// import GlobalProvider from "./context/globalState";
// import CustomerProfile from "./components/profile/customerProfile";

function App() {
  
  const { pathname } = useLocation() // to fetch url

  return (
    <>      
      <Link to="/">home | </Link> <br/> <hr/>

      <Switch>

        <Route path="/customer" component={Customer} />
        <Route path="/customersearch" component={CustomerSearch} />
        <Route path="/createcontract" component={CreateContract} />
        <Route path="/editcontract/:id" exact component={EditContract} />


        <Route path="/add" component={TakeInput} /> 
        <Route path="/list" component={ListData} />
        <Route path="/detail/:id" exact component={DetailData} />

        <Route path="/createbill" component={GenerateBill} />
        <Route path="/billsummary" component={BillSummary} />
        <Route path="/bill" component={Bill} />

        <Route path="/" exact component={Nav} />

        <Route render={() => <h1>error 404! Not Found</h1>} />


        {/* <GlobalProvider>
          <Route path="/profile" component={CustomerProfile} />
        </GlobalProvider> */}

      </Switch>

    </>
  );
}

export default App;
