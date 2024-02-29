import React, { Component } from "react";
import CarTableRow from "./CarTableRow";
import SearchFilter from "./SearchFilter";

class ShirtGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: "",
      colourFilter: "",
      sizeFilter: "",
      sortBy: null,
      sortOrder: "asc", // Default sorting order is ascending
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleColourFilterChange = this.handleColourFilterChange.bind(this);
    this.handleSizeFilterChange = this.handleSizeFilterChange.bind(this);
  }

  handleFilterChange(filterValue) {
    this.setState({ filterValue });
  }

  handleSort(event) {
    const selectedOption = event.target.value;
    const [sortBy, sortOrder] = selectedOption.split("_");
    this.setState({ sortBy, sortOrder });
  }

  handleColourFilterChange(event) {
    const colourFilter = event.target.value;
    this.setState({ colourFilter });
  }

  handleSizeFilterChange(event) {
    const sizeFilter = event.target.value;
    this.setState({ sizeFilter });
  }

  render() {
    const { filterValue, colourFilter, sizeFilter, sortBy, sortOrder } = this.state;
    let { cars } = this.props;

    // Apply filter
    let filteredCars = cars.filter((car) =>
      car.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    if (colourFilter) {
      filteredCars = filteredCars.filter((car) => car.colour === colourFilter);
    }
    if (sizeFilter) {
      filteredCars = filteredCars.filter((car) => car.size === sizeFilter);
    }

    // Apply sorting
    let sortedCars = [...filteredCars];
    if (sortBy) {
      sortedCars = sortedCars.sort((a, b) => {
        if (sortBy === 'price') {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
          if (sortOrder === "asc") {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        } else {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
          if (sortOrder === "asc") {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }
      });
    }

    return (
      <div>
        <div className="filter-container">

          {/* Sort */}
          <div className="dropdowns">
            <select id="sort" onChange={this.handleSort}>
              <option value="">Sort by</option>
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>F
              <option value="price_asc">Lowest Price</option>
              <option value="price_desc">Highest Price</option>
            </select>
          </div>

          {/* Filter - Colour */}
          <div className="dropdowns">
            <select id="colourFilter" onChange={this.handleColourFilterChange}>
              <option value="">Colour</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="grey">Grey</option>
              <option value="multi">Multi</option>
              <option value="beige">Beige</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
            </select>

            {/* Filter - Size */}
            <select id="sizeFilter" onChange={this.handleSizeFilterChange}>
              <option value="">Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>

            {/* Filter - Fabric */}
            {/* TBA */}
          </div>

          <SearchFilter
            onFilterChange={this.handleFilterChange}
            filterValue={filterValue}
          />

        </div>
        <div className="itemsGrid women_section">
          {sortedCars.map((car) => (
            <CarTableRow key={car._id} car={car} />
          ))}
        </div>
      </div>
    );
  }
}

export default ShirtGrid;

