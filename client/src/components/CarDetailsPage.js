import React, { Component } from "react";

class CarDetailsPage extends Component {
  render() {
    const { car } = this.props.location.state;

    return (
      <div>
        <h1>{car.name}</h1>
        <div>
          <img src={car.photos[0].url} alt="" />
        </div>
        <div>
          <p>Price: €{car.price}</p>
          <p>Description: {car.description}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    );
  }
}

export default CarDetailsPage;