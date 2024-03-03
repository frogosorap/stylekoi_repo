import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class OrderTableRow extends Component 
{    
    render() 
    {
        const {sale} = this.props;
        return (
            <tr>
                <td>{sale.carID}</td>
                <td>{sale.price}</td>
            </tr>
        )
    }
}