import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      submitted: false
    };
  } 

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const formData = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address
    };

    // Send the form data to the server
    axios.post("/api/sales", formData)
      .then(response => {
        console.log("Form data submitted successfully:", response.data);
        this.setState({ submitted: true });
      })
      .catch(error => {
        console.error("Error submitting form data:", error);
      });
  };
  
  render() {
    if (this.state.submitted) {
      return <p>Form submitted successfully!</p>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Your Address"
          value={this.state.address}
          onChange={this.handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Dashboard;
