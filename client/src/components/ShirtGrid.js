import React, { Component } from "react";
import CarTableRow from "./CarTableRow";
import SearchFilter from "./SearchFilter";

export default class ShirtGrid extends Component {
  constructor(props) 
  {

    super(props)

    this.state = {
      filteredShirts: [] || props.cars, // Initialize with an empty array
      cars: props.cars
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    

  }

  // HALF WORKING!!!
  componentDidMount() 
  {

    // Set the initial state using props.cars
    this.setState({ filteredShirts: this.props.cars }); //not initialising
    console.log(this.props.cars);
    
  }

  handleFilterChange(filterValue) 
  {
    //Filters the shirts with its inputted name
    const filteredShirts = this.props.cars.filter(car => car.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    this.setState({ filteredShirts });
    console.log(filteredShirts);
  }

  render() 
  {

    return (

      <div>
        <SearchFilter onFilterChange={this.handleFilterChange} />
        <div className="itemsGrid">
          {/* Renders the filtered shirts */}
          {

          this.state.filteredShirts.map(car => 
            (<CarTableRow key={car._id} car={car}/>

          ))
          }
        </div>
      </div>
    );
  }
}