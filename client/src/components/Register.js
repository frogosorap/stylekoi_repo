import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import { SERVER_HOST } from "../config/global_constants"

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            selectedFile: null,
            isRegistered: false,
            wasSubmittedAtLeastOnce: false,
            errors: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleFileChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // Perform validation
        const errors = this.validateForm();
        if (Object.keys(errors).some((key) => errors[key])) {
            this.setState({ errors });
            return;
        }

        let formData = new FormData()
        if (this.state.selectedFile) {
            formData.append("profilePhoto", this.state.selectedFile, this.state.selectedFile.name)
        }
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`, formData, { headers: { "Content-type": "multipart/form-data" } })
            .then(res => {
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("accessLevel", res.data.accessLevel);
                localStorage.setItem("profilePhoto", res.data.profilePhoto);
                localStorage.setItem("token", res.data.token);

                this.setState({ isRegistered: true })
            })
            .catch(err => {
                this.setState({ wasSubmittedAtLeastOnce: true })
            })
    }

    validateForm = () => {
        const { name, email, password, confirmPassword } = this.state;
        const errors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        // Name validation
        if (name.length <= 1) {
            errors.name = "Name must be longer than 1 character";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Email must follow the email format";
        }

        // Password validation
        if (password.length <= 5) {
            errors.password = "Password must be longer than 5 characters";
        }

        // Confirm Password validation
        if (password !== confirmPassword) {
            errors.confirmPassword = "Confirm Password must match Password";
        }

        return errors;
    };

    render() {
        let errorMessage = "";
        if (this.state.wasSubmittedAtLeastOnce) {
            errorMessage = <div className="error">Error: All fields must be filled in<br /></div>;
        }

        const { errors } = this.state;

        return (
            <form className="forms" noValidate={true} id="loginOrRegistrationForm">

                {this.state.isRegistered ? <Redirect to="/DisplayAllCars" /> : null}

                {errorMessage}

                <h2>New User Registration</h2>

                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                {errors.name && <div className="error red">{errors.name}</div>}
                <br />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                {errors.email && <div className="error red">{errors.email}</div>}
                <br />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                {errors.password && <div className="error red">{errors.password}</div>}
                <br />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                />
                {errors.confirmPassword && <div className="error red">{errors.confirmPassword}</div>}
                <br />

                <input
                    name="profilePhoto"
                    type="file"
                    onChange={this.handleFileChange}
                />
                <br /><br />

                <LinkInClass value="Register New User" className="green-button" onClick={this.handleSubmit} />
                <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
            </form>
        )
    }
}
