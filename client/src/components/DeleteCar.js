import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteCar extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllCars:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/cars/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {            
            this.setState({redirectToDisplayAllCars:true})            
        })
        .catch(err =>
        {
            // Do nothing
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}                      
            </div>
        )
    }
}