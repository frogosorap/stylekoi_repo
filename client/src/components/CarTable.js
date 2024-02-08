import React, {Component} from "react"
import CarTableRow from "./CarTableRow"


export default class CarTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Colour</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Gender</th>
                        <th>Fabric</th>
                        <th>Description</th>
                        <th>Photos</th>
                        <th></th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.cars.map((car) => <CarTableRow key={car._id} car={car}/>)}
                </tbody>
            </table>      
        )
    }
}