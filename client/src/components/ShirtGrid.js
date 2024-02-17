import React, { Component } from "react";
import CarTableRow from "./CarTableRow";

export default class ShirtGrid extends Component {
  render() {
    return (
        <div>
            {/* <div>
                 <table>
                   
                     <tbody>
                         {this.props.cars.map((car) => <CarTableRow key={car._id} car={car}/>)}
                     </tbody>
                 </table>
            </div> */}
        
      <div className="itemsGrid">
        {this.props.cars.map((car) => (
          <CarTableRow key={car._id} car={car} />
        ))}
      </div>
    </div>
    );
  }
}