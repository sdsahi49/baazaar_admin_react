import React from 'react';
import ReactDOM from 'react-dom';
import{BrowserRouter as Router,Route,Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Users from './Components/Users';
import Units from './Components/Units';
import Brands from './Components/Brands';
import Add_Unit from './Components/Add_Unit';
import Edit_Unit from './Components/Edit_Unit';
import Add_Brand from './Components/Add_Brand';
import Edit_Brand from './Components/Edit_Brand';
import Countries from './Components/Countries';
import Add_Country from './Components/Add_Country';
import Edit_Country from './Components/Edit_Country';
import Orders from './Components/Orders';
import Order_Details from './Components/Order_Details';
import Vendors from './Components/Vendors';

import Vendor_Order_List from './Components/Vendor_Order_List';

import ProtectedRoute from "./ProtectedRoute";




  const App=() =>{
  return (

  <Router>
  <Switch>
    <Route exact path="/" component={Login}/>
    <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
    <ProtectedRoute exact path="/user_list" component={Users}/>
    <ProtectedRoute exact path="/unit_list" component={Units}/>
    <ProtectedRoute exact path="/brand_list" component={Brands}/>
    <ProtectedRoute exact path="/add_unit" component={Add_Unit}/>
    <ProtectedRoute exact path="/edit_unit" component={Edit_Unit}/>
    <ProtectedRoute exact path="/add_brand" component={Add_Brand}/>
    <ProtectedRoute exact path="/edit_brand" component={Edit_Brand}/>
    <ProtectedRoute exact path="/country_list" component={Countries}/>
    <ProtectedRoute exact path="/add_country" component={Add_Country}/>

    <ProtectedRoute exact path="/edit_country" component={Edit_Country}/>
    <ProtectedRoute exact path="/order_list" component={Orders}/>
    <ProtectedRoute exact path="/order_details" component={Order_Details}/>
    <ProtectedRoute exact path="/vendor_list" component={Vendors}/>

    <ProtectedRoute exact path="/vendor_order_list" component={Vendor_Order_List}/>
    
  </Switch>
</Router>


  );
}

export default App;
