import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import UserTable from "./UserTable"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class DisplayAllUsers extends Component 
{
    constructor(props) {
        super(props);
    
        this.state = {
          users: [],
        };
      }
    
      componentDidMount() {
        axios
          .get(`${SERVER_HOST}/users`)
          .then((res) => {
            this.setState({ users: res.data });
          })
          .catch((err) => {
            // do nothing
          });
      }

  
    render() 
    {   
        console.log("Users",this.state.users);
        return (           
            <div className="form-container">
                <div className="table-container">
                    <UserTable users={this.state.users} /> 
                </div>
            </div> 
        )
    }
}