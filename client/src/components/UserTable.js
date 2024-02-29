import React, {Component} from "react"
import UserTableRow from "./UserTableRow"


export default class UserTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>AccessLevel</th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.users.map((user) => <UserTableRow key={user._id} user={user}/>)}
                </tbody>
            </table>      
        )
    }
}