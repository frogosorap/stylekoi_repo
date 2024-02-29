import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteUser extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllUsers:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/users/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {            
            this.setState({redirectToDisplayAllUsers:true})            
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
                {this.state.redirectToDisplayAllUsers ? <Redirect to="/DisplayAllUsers"/> : null}                      
            </div>
        )
    }
}