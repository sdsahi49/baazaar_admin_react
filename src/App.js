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
    
  </Switch>
</Router>


  );
}

export default App;
