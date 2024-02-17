import React, { Component } from "react"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

import "./css/App.css"

import "./css/raph.css"
import "./css/elga.css"
import "./css/mila.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"
import BuyCar from "./components/BuyCar"
import PayPalMessage from "./components/PayPalMessage"

import MenShirts from "./components/MenShirts"
import WomenShirts from "./components/WomenShirts"

import { ACCESS_LEVEL_GUEST } from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined") {
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div class="banner">
                    <p>Free shipping on orders over €30</p>
                </div>
                <div class="navbar">
                    <div class="leftnav">
                        <a href="#index.html">StyleKoi</a>
                    </div>

                    <div class="midnav">
                        <Link to="/DisplayAllCars">All Shirts</Link>
                        <Link to="/MenShirts">Men's Shirts</Link>
                        <Link to="/WomenShirts">Women's Shirts</Link>
                        <a href="#index.html">TEST</a>
                    </div>

                    <div class="rightnav">
                        <Link to="/Login">Login</Link>
                        <a href="#index.html">TEST</a>
                    </div>
                </div>

                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />
                    <Route exact path="/" component={DisplayAllCars} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/BuyCar/:id" component={BuyCar} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage} />
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars} />
                    <Route exact path="/MenShirts" component={MenShirts} />
                    <Route exact path="/WomenShirts" component={WomenShirts} />
                    <Route path="*" component={DisplayAllCars} />
                </Switch>

            </BrowserRouter>
        )
    }
}