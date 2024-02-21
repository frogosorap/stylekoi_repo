import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

// import CarTable from "./CarTable"
import ShirtGrid from "./ShirtGrid"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class MenShirts extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            cars:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/cars`)
        .then(res => 
        { 
            this.setState({cars: res.data})                                         
        })
        .catch(err =>
        {
            // do nothing
        })
    }

  
    render() 
    {   
        return (           
            <div className="form-container">
                {
                    localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                    ? <div className="logout">
                        {
                            localStorage.profilePhoto !== "null" 
                            ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                            : null
                        }                        
                        <Logout/>
                      </div>
                    : <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>  
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/></div>
                }
                
                <div className="table-container">
                    <h2>MEN'S COLLECTION</h2>
                    <ShirtGrid cars={this.state.cars} /> 
                        
                    {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                        ? <div className="add-new-car">
                            <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
                          </div>
                        : null
                    }
                </div>
            </div> 
        )
    }
}