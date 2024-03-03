import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";
import { SERVER_HOST } from "../config/global_constants";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      wasSubmittedAtLeastOnce: false,
      name: localStorage.getItem("name") || "",
      orderName: localStorage.getItem("orderName") || "",
      orderEmail: localStorage.getItem("orderEmail") || "",
      address: localStorage.getItem("address") || "",
      phone: localStorage.getItem("phone") || ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    axios
      .post(
        `${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`
      )
      .then((res) => {
        localStorage.name = res.data.name;
        localStorage.accessLevel = res.data.accessLevel;
        localStorage.profilePhoto = res.data.profilePhoto;
        localStorage.token = res.data.token;

        this.setState({ isLoggedIn: true });
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ wasSubmittedAtLeastOnce: true });
      });
  };

  handleProfileSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("orderName", this.state.orderName);
    localStorage.setItem("orderEmail", this.state.orderEmail);
    localStorage.setItem("address", this.state.address);
    localStorage.setItem("phone", this.state.phone);
    alert("Profile Updated Successfully");
  };

  render() {
    let errorMessage = "";
    if (this.state.wasSubmittedAtLeastOnce) {
      errorMessage = (
        <div className="error">
          Login Details are incorrect
          <br />
        </div>
      );
    }

    return (
      <div>
        <form className="forms" noValidate={true} id="loginOrRegistrationForm">
          <h2>Login</h2>

          {this.state.isLoggedIn ? <Redirect to="/DisplayAllCars" /> : null}

          {errorMessage}

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <br />

          <LinkInClass
            value="Login"
            className="green-button"
            onClick={this.handleSubmit}
          />
          <Link className="red-button" to={"/DisplayAllCars"}>
            Cancel
          </Link>
          <br />
          <br />
          <div>
            <h2>New User?</h2>
            <Link className="reg-button" to={"/Register"}>
              Register
            </Link>
          </div>
        </form>

        <div className="profileform">
          <h2>Guest Details</h2>
          <form onSubmit={this.handleProfileSubmit}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="orderName"
                value={this.state.orderName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="orderEmail"
                value={this.state.orderEmail}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Phone: </label>
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>

        <br />
      </div>
    );
  }
}