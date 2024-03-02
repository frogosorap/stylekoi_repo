import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  
  render() {
    
    return (
      <form>
        
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