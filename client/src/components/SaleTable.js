import React, { Component } from "react";
import SaleTableRow from "./SaleTableRow";

export default class SaleTable extends Component {
  
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
    let { sales } = this.props;

   // Sorting sales based on the selected sorting order and criteria
    if (sortBy === 'price') {
        sales.sort((a, b) => {
        let comparison = 0;
        if (a.price > b.price) {
            comparison = 1;
        } else if (a.price < b.price) {
            comparison = -1;
        }
        return sortOrder === "asc" ? comparison : comparison * -1;
        });
    }
  
      // Filtering sales based on access level
      if (filterAccessLevel) {
        sales = sales.filter(sale => sale.accessLevel === parseInt(filterAccessLevel));
      }
  
    // Filtering sales based on search query (PayPal ID)
    if (searchQuery) {
        sales = sales.filter(sale => sale.paypalPaymentID.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return (
      <div className="sale-page">
        <h1>SALES</h1>
        <select id="sort" onChange={this.handleSort}>
            <option value="">Sort By</option>
            <option value="price_asc">Price Low-High</option>
            <option value="price_desc">Price High-Low</option>
        </select>
        <div className="search-bar">
            <input
            type="text"
            placeholder="Search by PayPal ID..."
            onChange={this.handleSearch}
            value={searchQuery}
            />
        </div>
        <table className="sale-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>PayPal ID</th>
              <th>Email</th>
              <th>Shirt ID</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <SaleTableRow key={sale._id} sale={sale} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}