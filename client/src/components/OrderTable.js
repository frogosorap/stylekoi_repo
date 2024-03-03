import React, { Component } from "react";
import OrderTableRow from "./OrderTableRow";

export default class OrderTable extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
          sortBy: null,
          sortOrder: "asc", // Default sorting order is ascending
          filterAccessLevel: "", // Default filter is empty
          searchQuery: "", // Default search query is empty
          priceFilter: "", // Default price filter is empty
          userEmail: localStorage.getItem("orderEmail") || "" // Get logged-in user's email
        };
    
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePriceFilter = this.handlePriceFilter.bind(this);
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

      handlePriceFilter(event) {
        const priceFilter = event.target.value;
        this.setState({ priceFilter });
      }


  render() {
    const { sortBy, sortOrder, filterAccessLevel, searchQuery, priceFilter, userEmail } = this.state;
    let { sales } = this.props;

    // Filter sales based on the logged-in user's email
    sales = sales.filter(sale => sale.orderEmail === userEmail);
  
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
    
    // Filtering sales based on search query (PayPal ID)
    if (searchQuery) {
        sales = sales.filter(sale => sale.paypalPaymentID.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filtering sales based on price filter
    if (priceFilter === "below_20") {
        sales = sales.filter(sale => sale.price < 20);
    } else if (priceFilter === "below_40") {
        sales = sales.filter(sale => sale.price >= 20 && sale.price < 40);
    } else if (priceFilter === "above_40") {
        sales = sales.filter(sale => sale.price >= 40);
    }
    
    return (
      <div className="sale-page">
        <select id="sort" onChange={this.handleSort}>
            <option value="">Sort By</option>
            <option value="price_asc">Price Low-High</option>
            <option value="price_desc">Price High-Low</option>
        </select>
        <select id="priceFilter" onChange={this.handlePriceFilter}>
            <option value="">Filter By Price</option>
            <option value="below_20">0-20</option>
            <option value="below_40">20-40</option>
            <option value="above_40">40+</option>
        </select>
        {/* <div className="filter-options">
          <select id="filter" onChange={this.handleFilter}>
            <option value="">View All</option>
            <option value="1">Customers</option>
            <option value="2">Admin</option>
          </select>
        </div> */}
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
              <th>Shirt ID</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <OrderTableRow key={sale._id} sale={sale} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}