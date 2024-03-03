import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";
import { SERVER_HOST } from "../config/global_constants";

import OrderTable from "./OrderTable";

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sales: [],
            isLoggedIn: true,
            orderName: localStorage.getItem("orderName") || "",
            orderEmail: localStorage.getItem("orderEmail") || "",
            address: localStorage.getItem("address") || "",
            phone: localStorage.getItem("phone") || "",
            accessLevel: localStorage.getItem("accessLevel") || ACCESS_LEVEL_NORMAL_USER // Default to guest access level
        }
    }

    isNormalUser() {
        return parseInt(localStorage.accessLevel) === ACCESS_LEVEL_NORMAL_USER;
      }

    componentDidMount() {
        axios
            .get(`${SERVER_HOST}/sales`)
            .then((res) => {
                this.setState({ sales: res.data });
            })
            .catch((err) => {
                // do nothing
            });

        if (!localStorage.getItem("token")) {
            this.setState({ isLoggedIn: false });
        }

        const profilePhotoUrl = localStorage.getItem("profilePhoto");
        const name = localStorage.getItem("name");
        const orderName = localStorage.getItem("orderName") || "";
        const orderEmail = localStorage.getItem("orderEmail") || "";
        const address = localStorage.getItem("address") || "";
        const phone = localStorage.getItem("phone") || "";
        const accessLevel = localStorage.getItem("accessLevel") || ACCESS_LEVEL_NORMAL_USER;

        this.setState({ profilePhotoUrl, name, orderName, orderEmail, address, phone, accessLevel });
        console.log(accessLevel);
    }

    handleLogout = () => {
        localStorage.clear();
        this.setState({ isLoggedIn: false });
        window.location.reload();
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("orderName", this.state.orderName);
        localStorage.setItem("orderEmail", this.state.orderEmail);
        localStorage.setItem("address", this.state.address);
        localStorage.setItem("phone", this.state.phone);
        alert("Profile Updated Successfully");
    };

    render() {
        const profilePhotoUrl = localStorage.getItem("profilePhoto");
        const { accessLevel } = this.state;

        if (!this.state.isLoggedIn) {
            return <Redirect to="/DisplayAllCars" />;
        }

        return (
            <div>
                <br />
                <center>
                    <img
                        src={`data:image/png;base64,${profilePhotoUrl}`}
                        alt="Profile Pic"
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%"
                        }}
                    />
                    <h2>Welcome, {this.state.name}</h2>
                    {this.isNormalUser() && (
                        <div>
                            <h2>Your checkout details</h2>
                            <form className="profileform" onSubmit={this.handleSubmit}>
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
                            <h2>Order History</h2>
                            <div className="order-history">
                                <OrderTable sales={this.state.sales} />
                            </div>
                        </div>
                    )}
                    <br />
                    <LinkInClass
                        value="Logout"
                        className="red-button"
                        onClick={this.handleLogout}
                    />
                </center>
                <br /><br />
            </div>
        );
    }
}