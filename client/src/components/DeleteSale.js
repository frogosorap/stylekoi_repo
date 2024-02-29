import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteSale extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllSales:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/sales/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {            
            this.setState({redirectToDisplayAllSales:true})            
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
                {this.state.redirectToDisplayAllSales ? <Redirect to="/DisplayAllSales"/> : null}                      
            </div>
        )
    }
}