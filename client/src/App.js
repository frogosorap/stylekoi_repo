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

import ProfilePicture from "./components/ProfilePicture";

import { ACCESS_LEVEL_GUEST } from "./config/global_constants";

if (typeof localStorage.accessLevel === "undefined") {
  localStorage.name = "GUEST";
  localStorage.accessLevel = ACCESS_LEVEL_GUEST;
  localStorage.token = null;
  localStorage.profilePhoto = null;
}

export default class App extends Component {
  render() {
    const profilePhotoUrl =
      localStorage.profilePhoto ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVsHOtBsku-BR1Y2GbrBcLfVaUtO1GzbUbIg&usqp=CAU"; // default profile pic if not logged in

    return (
      <BrowserRouter>
        <div className="banner">
          <p className="marquee">
            <span>
              Free shipping on orders over €30 &emsp;&emsp;||&emsp;&emsp; Sale:
              50% off - Only Today!! &emsp;&emsp;||&emsp;&emsp; Buy over EUR
              39.99, get 25% off!! &emsp;&emsp;||&emsp;&emsp; Limited Deals!
            </span>
          </p>
        </div>
        <div className="parallax">
          <div className="parallax_header">
            <h1> Sample Text To Make Site</h1>
            Look Cool... And something smaller here too...
          </div>
        </div>
        <div className="navbar">
          <div className="leftnav">
            <a href="#index.html">StyleKoi</a>
          </div>

          <div className="midnav">
            <Link to="/DisplayAllCars">ALL SHIRTS</Link>
            <Link to="/MenShirts">MEN'S SHIRTS</Link>
            <Link to="/WomenShirts">WOMENS SHIRTS</Link>
            <a href="#index.html">SALE</a>
          </div>

                    <div class="rightnav">
                        <Link to="/Login">Login</Link>
                        <Link to="/Basket">Basket</Link>

            {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
              <div className="logout">
                {localStorage.profilePhoto !== "null" && (
                  <ProfilePicture
                    profilePhotoUrl={`data:;base64,${localStorage.profilePhoto}`}
                  />
                )}
                <Logout />
              </div>
            ) : (
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVsHOtBsku-BR1Y2GbrBcLfVaUtO1GzbUbIg&usqp=CAU"
                }
                alt="Default Profile Pic"
                style={{ borderRadius: "50%", height: "50px", width: "50px" }}
              />
            )}
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
          <Route exact path="/DisplayAllCars" component={DisplayAllCars} />
          <Route exact path="/MenShirts" component={MenShirts} />
          <Route exact path="/WomenShirts" component={WomenShirts} />
          <Route path="*" component={DisplayAllCars} />
        </Switch>
      </BrowserRouter>
    );
  }
}
