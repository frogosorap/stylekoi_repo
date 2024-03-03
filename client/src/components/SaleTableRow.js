import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class SaleTableRow extends Component 
{    
    render() 
    {
        const {sale} = this.props;
        return (
            <tr>
                <td>{sale.orderName}</td>
                <td>{sale.paypalPaymentID}</td>
                <td>{sale.orderEmail}</td>
                <td>{sale.carID}</td>
                <td>{sale.price}</td>

                <td>{localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
                  <Link
                    className="red-button"
                    to={"/DeleteSale/" + this.props.sale._id}
                  >
                    X
                  </Link>
                ) : null}
                </td>
            </tr>
        )
    }
}