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
      phone: localStorage.getItem("phone") || "",
      errors: {
        orderName: "",
        orderEmail: "",
        address: "",
        phone: ""
      }
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

    // Perform validation
    const errors = this.validateForm();
    if (Object.keys(errors).some((key) => errors[key])) {
      this.setState({ errors });
      return;
    }

    // Save profile if form is validated
    localStorage.setItem("orderName", this.state.orderName);
    localStorage.setItem("orderEmail", this.state.orderEmail);
    localStorage.setItem("address", this.state.address);
    localStorage.setItem("phone", this.state.phone);
    alert("Profile Updated Successfully");
  };

  validateForm = () => {
    // Validation logic
    const errors = {
      orderName: "",
      orderEmail: "",
      address: "",
      phone: ""
    };

    // Name validation
    if (this.state.orderName.length <= 1) {
      errors.orderName = "Name should be longer than 1 character";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.state.orderEmail)) {
      errors.orderEmail = "Email should follow the email format";
    }

    // Address validation
    if (this.state.address.length <= 10) {
      errors.address = "Address should be longer than 10 characters";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/; // Irish phone number format
    if (!phoneRegex.test(this.state.phone)) {
      errors.phone = "Phone should be in the form of an Irish number (10 digits)";
    }

    return errors;
  };

  render() {
    let errorMessage = "";
    if (this.state.wasSubmittedAtLeastOnce) {
      errorMessage = (
        <div style={{ color: "#dc3545" }}>
          Login Details are incorrect
          <br />
        </div>
      );
    }

    const { errors } = this.state;

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
          {errors.orderEmail && <div style={{ color: "#dc3545" }}>{errors.orderEmail}</div>}

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

        <div className="guest-details">
          <h2>Guest Details</h2>
          <form onSubmit={this.handleProfileSubmit}>
            <div>
              <input
                type="text"
                name="orderName"
                value={this.state.orderName}
                onChange={this.handleChange}
                placeholder="Please enter name..."
              />
              {errors.orderName && <div style={{ color: "#dc3545" }}>{errors.orderName}</div>}
            </div>
            <div>
              <input
                type="email"
                name="orderEmail"
                value={this.state.orderEmail}
                onChange={this.handleChange}
                placeholder="Please enter email..."
              />
              {errors.orderEmail && <div style={{ color: "#dc3545" }}>{errors.orderEmail}</div>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
                placeholder="Please enter address..."
              />
              {errors.address && <div style={{ color: "#dc3545" }}>{errors.address}</div>}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                placeholder="Please enter phone number..."
              />
              {errors.phone && <div style={{ color: "#dc3545" }}>{errors.phone}</div>}
            </div>
            <button type="submit">Save</button>
          </form>
        </div>

        <br />
      </div>
    );
  }
}
