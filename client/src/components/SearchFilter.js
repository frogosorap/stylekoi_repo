import React, { Component } from "react";

export default class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ filterValue: value });
    this.props.onFilterChange(value);
  }

  render() {
    return (
      <div style={{ textAlign: "center", position: "relative" }}>
        {/* Search icon */}
        <span
          style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <i className="fas fa-search" style={{ color: "#333" }}></i>
        </span>

        {/* Input with bottom border */}
        <input
          type="text"
          id="filterInput"
          value={this.state.filterValue}
          onChange={this.handleChange}
          placeholder="Search..."
          style={{
            border: "0",
            borderRadius: "0",
            borderBottom: "1px solid #333",
            padding: "15px",
            paddingLeft: "28px",
            width: "200px",
            outline: "none",
          }}
        />
      </div>
    );
  }
}
