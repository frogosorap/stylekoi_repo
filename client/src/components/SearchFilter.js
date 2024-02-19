import React, { Component } from "react";

export default class SearchFilter extends Component {

  constructor(props) 
  {
    super(props)

    this.state = {
      filterValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    const { value } = event.target;
    this.setState({ filterValue: value });
    this.props.onFilterChange(value);

  }

  render() 
  {
    return (

      <div>
              {/*htmlFor*/}
        <label className="filterInput">Filter:</label>
        <input
          type="text"
          id="filterInput"
          value={this.state.filterValue}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}