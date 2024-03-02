import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";
import { SERVER_HOST } from "../config/global_constants";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: true,
            name: localStorage.getItem("name") || ""
        }
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            this.setState({ isLoggedIn: false });
        }

        const profilePhotoUrl = localStorage.getItem("profilePhoto");
        this.setState({ profilePhotoUrl });
    }

    handleLogout = () => {
        localStorage.clear();
        this.setState({ isLoggedIn: false });
        window.location.reload();
    };

    render() {
        const profilePhotoUrl = localStorage.getItem("profilePhoto");

        if (!this.state.isLoggedIn) {
            return <Redirect to="/DisplayAllCars" />;
        }

        return (
            <div>
                <br></br>
                <center>
                <img src={`data:image/png;base64,${profilePhotoUrl}`}
                alt="Profile Pic"
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%"
                }}
                />
                    <h2>Welcome, {this.state.name}</h2>
                    <h2>Order History</h2>
                    <p>To be added soon...</p>
                    <br></br>
                    <LinkInClass value="Logout" className="red-button" onClick={this.handleLogout} />
                </center>
                <br></br><br></br>
            </div>
        );
    }
}