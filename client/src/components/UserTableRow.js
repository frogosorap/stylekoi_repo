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
              <td>
                {user.profilePhotoFilename && (
                  <img
                    src={`data:image/png;base64,${user.profilePhoto}`}
                    alt="Profile"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                )}
              </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.accessLevel}</td>
                <td>{localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
                  <Link
                    className="red-button"
                    to={"/DeleteUser/" + this.props.user._id}
                  >
                    <i class='fas fa-trash-alt'></i>
                  </Link>
                ) : null}
                </td>
            </tr>
        )
    }
}