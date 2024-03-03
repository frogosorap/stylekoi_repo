import React, { Component } from "react";
import UserTableRow from "./UserTableRow";

export default class UserTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: null,
      sortOrder: "asc", // Default sorting order is ascending
      filterAccessLevel: "", // Default filter is empty
      searchQuery: "", // Default search query is empty
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSort(event) {
    const selectedOption = event.target.value;
    const [sortBy, sortOrder] = selectedOption.split("_");
    this.setState({ sortBy, sortOrder });
  }

  handleFilter(event) {
    const filterAccessLevel = event.target.value;
    this.setState({ filterAccessLevel });
  }

  handleSearch(event) {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
  }

  render() {
    const { sortBy, sortOrder, filterAccessLevel, searchQuery } = this.state;
    let { users } = this.props;

    // Sorting users based on the selected sorting order and criteria
    if (sortBy) {
      users.sort((a, b) => {
        let comparison = 0;
        if (a[sortBy] > b[sortBy]) {
          comparison = 1;
        } else if (a[sortBy] < b[sortBy]) {
          comparison = -1;
        }
        return sortOrder === "asc" ? comparison : comparison * -1;
      });
    }

    // Filtering users based on access level
    if (filterAccessLevel) {
      users = users.filter(
        (user) => user.accessLevel === parseInt(filterAccessLevel)
      );
    }

    // Filtering users based on search query
    if (searchQuery) {
      users = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return (
      <div className="user-page">
        <h1>Users</h1>
        <div className="sort-options">
          <select id="sort" onChange={this.handleSort}>
            <option value="">Sort By</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
        </div>
        <div className="filter-options">
          <select id="filter" onChange={this.handleFilter}>
            <option value="">View All</option>
            <option value="1">Customers</option>
            <option value="2">Admin</option>
          </select>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            onChange={this.handleSearch}
            value={searchQuery}
          />
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Email</th>
              <th>Access Level</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserTableRow key={user._id} user={user} />
            ))}
          </tbody>
        </table>
        </div>
    );
  }
}
