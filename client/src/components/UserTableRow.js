import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class UserTableRow extends Component 
{    
    render() 
    {
        
        const {user} = this.props;
        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.accessLevel}</td>
            </tr>
        )
    }
}