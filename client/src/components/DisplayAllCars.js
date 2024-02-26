import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import CarTable from "./CarTable"
import ShirtGrid from "./ShirtGrid"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class DisplayAllCars extends Component 
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

    // remove the pfp code here once app.js and profilepicture.js code works
    render() 
    {   
        return (        
            <div className="form-container">
                
                <div className="table-container">
                    <h2 style={{ textAlign: "center" }}>COLLECTION</h2>
                    <ShirtGrid cars={this.state.cars} /> 
                    <br/><br/><br/>
                    {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                        ? <div className="add-new-car">
                            <Link className="blue-button" to={"/AddCar"}>Add New Item</Link>
                          </div>
                        : null
                    }
                    {/* <h2>Collection</h2> */}
                    <CarTable cars={this.state.cars} /> 
                    <br/><br/><br/>
                    {/* <h2>Recently Accessed</h2>
                    <CarTable cars={this.state.cars} />  */}
                        
                    
                </div>
            </div> 
        )
    }
}