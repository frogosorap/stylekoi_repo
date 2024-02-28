import React, { Component } from "react";
import CarTableRow from "./CarTableRow";
import SearchFilter from "./SearchFilter";

class ShirtGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: "",
      sortBy: null,
      sortOrder: "asc", // Default sorting order is ascending
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleFilterChange(filterValue) {
    this.setState({ filterValue });
  }

  handleSort(event) {
    const selectedOption = event.target.value;
    const [sortBy, sortOrder] = selectedOption.split("_");
    this.setState({ sortBy, sortOrder });
  }

  render() {
    const { filterValue, sortBy, sortOrder } = this.state;
    let { cars } = this.props;

    // Apply filter
    const filteredCars = filterValue
      ? cars.filter((car) =>
          car.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      : cars;

    // Apply sorting
    let sortedCars = [...filteredCars];
    if (sortBy) {
      sortedCars = sortedCars.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return (
      <div>
        <div className="filter-container">
          <SearchFilter
            onFilterChange={this.handleFilterChange}
            filterValue={filterValue}
          />
          <div className="sort-dropdown">
            <select id="sort" onChange={this.handleSort}>
              <option value="">-- Sort by --</option>
              <option value="name_asc">Name by (Ascending)</option>
              <option value="name_desc">Name by (Descending)</option>
            </select>
          </div>
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

// export default class ShirtGrid extends Component {
//   constructor(props) 
//   {

//     super(props)

//     this.state = {
//       filteredShirts: [] || props.cars, // Initialize with an empty array
//       cars: props.cars
//     };

//     this.handleFilterChange = this.handleFilterChange.bind(this);
    

//   }

//   // HALF WORKING!!!
//   componentDidMount() 
//   {

//     // Set the initial state using props.cars
//     this.setState({ filteredShirts: this.props.cars }); //not initialising
//     console.log(this.props.cars);
    
//   }

//   handleFilterChange(filterValue) 
//   {
//     //Filters the shirts with its inputted name
//     const filteredShirts = this.props.cars.filter(car => car.name.toLowerCase().includes(filterValue.toLowerCase())
//     );

//     this.setState({ filteredShirts });
//     console.log(filteredShirts);
//   }

//   render() 
//   {

//     return (

//       <div>
//         <SearchFilter onFilterChange={this.handleFilterChange} />
//         <div className="itemsGrid women_section">
//           {/* Renders the filtered shirts */}
//           {

//           this.state.filteredShirts.map(car => 
//             (<CarTableRow key={car._id} car={car}/>

//           ))
//           }
//         </div>
//       </div>
//     );
//   }
// }

// ShirtGrid.js

