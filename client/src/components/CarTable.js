import React, { Component } from "react";
import CarTableRow from "./CarTableRow";

export default class CarTable extends Component {
  render() {
    return (
      <div className="itemsRow">
        {this.props.cars.map((car) => (
          <CarTableRow key={car._id} car={car} />
        ))}
      </div>
    );
  }
}
