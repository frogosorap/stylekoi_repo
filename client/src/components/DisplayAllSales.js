import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import SaleTable from "./SaleTable"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class DisplayAllSales extends Component 
{
    constructor(props) {
        super(props);
    
        this.state = {
          sales: [],
        };
      }
    
      componentDidMount() {
        axios
          .get(`${SERVER_HOST}/sales`)
          .then((res) => {
            this.setState({ sales: res.data });
          })
          .catch((err) => {
            // do nothing
          });
      }

  
    render() 
    {   
        console.log("sales",this.state.sales);
        return (           
            <div className="form-container">
                <div className="table-container">
                    <SaleTable sales={this.state.sales} /> 
                </div>
            </div> 
        )
    }
}