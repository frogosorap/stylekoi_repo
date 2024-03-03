import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./css/App.css";

import "./css/raph.css";
import "./css/elga.css";
import "./css/mila.css";

import Register from "./components/Register";
import ResetDatabase from "./components/ResetDatabase";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddCar from "./components/AddCar";
import EditCar from "./components/EditCar";
import DeleteCar from "./components/DeleteCar";
import DisplayAllCars from "./components/DisplayAllCars";
import LoggedInRoute from "./components/LoggedInRoute";
import BuyCar from "./components/BuyCar";
import PayPalMessage from "./components/PayPalMessage";

import MenShirts from "./components/MenShirts";
import WomenShirts from "./components/WomenShirts";

import CarTableRow from "./components/CarTableRow"; // Import CarTableRow component
import CarDetailsPage from "./components/CarDetailsPage"; // Import CarDetailsPage component

import BasketPage from "./components/BasketPage";
import DisplayAllUsers from "./components/DisplayAllUsers";

import DisplayAllSales from "./components/DisplayAllSales";

import DeleteUser from "./components/DeleteUser";

import DeleteSale from "./components/DeleteSale";

import Profile from "./components/Profile";

import Dashboard from "./components/Dashboard"; 

import { ACCESS_LEVEL_GUEST,ACCESS_LEVEL_ADMIN,ACCESS_LEVEL_NORMAL_USER } from "./config/global_constants";

if (typeof localStorage.accessLevel === "undefined") {
  localStorage.name = "GUEST";
  localStorage.accessLevel = ACCESS_LEVEL_GUEST;
  localStorage.token = null;
  localStorage.profilePhoto = null;
}

export default class App extends Component {
  
  isAdmin() {
    return parseInt(localStorage.accessLevel) === ACCESS_LEVEL_ADMIN;
  }

  isNormalUserOrGuest() {
    const accessLevel = parseInt(localStorage.accessLevel);
    return accessLevel === ACCESS_LEVEL_NORMAL_USER || accessLevel === ACCESS_LEVEL_GUEST;
  }

  isNormalUserOrAdmin() {
    const accessLevel = parseInt(localStorage.accessLevel);
    return accessLevel === ACCESS_LEVEL_NORMAL_USER || accessLevel === ACCESS_LEVEL_ADMIN;
  }

  isGuest() {
    return parseInt(localStorage.accessLevel) === ACCESS_LEVEL_GUEST;
  }

  isNormalUser() {
    return parseInt(localStorage.accessLevel) === ACCESS_LEVEL_NORMAL_USER;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="banner">
          <p className="marquee">
            <span>
            <i class="fa fa-truck navicon"></i>&emsp;Free shipping on orders over €30 &emsp;||&emsp; <i class="fas fa-tags navicon"></i>&emsp;Sale: 50% off - Only Today! &emsp;||&emsp; <i class="	fab fa-cc-paypal navicon"></i>&emsp;Shop in confidence with PayPal
            </span>
          </p>
        </div>
        <div className="parallax">
          <div className="parallax_header">
            <h1>Shop Now At StyleKoi</h1>
            <h3>Trendy asian street style clothing</h3>
          </div>
        </div>
        <div className="navbar">
          <div className="leftnav">
            <Link to="/DisplayAllCars">StyleKoi</Link>
          </div>

          <div className="midnav">
            <Link to="/DisplayAllCars">ALL SHIRTS</Link>
            <Link to="/MenShirts">MEN'S SHIRTS</Link>
            <Link to="/WomenShirts">WOMEN'S SHIRTS</Link>
          </div>

          <div class="rightnav">
            {this.isGuest() && <Link to="/Login"><i class='far fa-user iconstyle'></i></Link>}
            {this.isNormalUserOrAdmin() && <Link to="/Profile"><i class='fas fa-user iconstyle'></i></Link>}
            {this.isNormalUserOrGuest() && <Link to="/Basket"><i class='fas fa-shopping-cart iconstyle'></i></Link>}
            {this.isAdmin() && <Link to="/DisplayAllSales"><i class='fas fa-chart-line iconstyle'></i></Link>}
            {this.isAdmin() && <Link to="/DisplayAllUsers"><i class='fas fa-users-cog iconstyle'></i></Link>}
          </div>
        </div>

        <Switch>
          <Route exact path="/Register" component={Register} />
          <Route exact path="/ResetDatabase" component={ResetDatabase} />
          <Route exact path="/" component={DisplayAllCars} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/BuyCar/:id" component={BuyCar} />
          <Route
            exact
            path="/PayPalMessage/:messageType/:payPalPaymentID"
            component={PayPalMessage}
          />

          <Route path="/" exact component={CarTableRow} />
          <Route path="/CarDetailsPage" component={CarDetailsPage} />

          <Route exact path="/Basket" component={BasketPage} />

          <LoggedInRoute exact path="/Logout" component={Logout} />
          <LoggedInRoute exact path="/AddCar" component={AddCar} />
          <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
          <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />

          
          <LoggedInRoute exact path="/DeleteUser/:id" component={DeleteUser} />

          <LoggedInRoute exact path="/DeleteSale/:id" component={DeleteSale} />

          <Route exact path="/DisplayAllUsers" component={DisplayAllUsers}/> 
          
          <Route exact path="/DisplayAllSales" component={DisplayAllSales}/> 
          
          <Route exact path="/Dashboard" component={Dashboard} />

          <Route exact path="/DisplayAllCars" component={DisplayAllCars} />
          <Route exact path="/MenShirts" component={MenShirts} />
          <Route exact path="/WomenShirts" component={WomenShirts} />
          <Route exact path="/Profile" component={Profile} />
          <Route path="*" component={DisplayAllCars} />
        </Switch>
      </BrowserRouter>
    );
  }
}
