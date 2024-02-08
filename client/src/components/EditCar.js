import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditCar extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            model: ``,
            colour: ``,
            year: ``,
            price: ``,
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/cars/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                model: res.data.model,
                colour: res.data.colour,
                year: res.data.year,
                price: res.data.price
            })            
        })
        .catch(err => 
        {
            // do nothing
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const carObject = {
            model: this.state.model,
            colour: this.state.colour,
            year: this.state.year,
            price: this.state.price
        }

        axios.put(`${SERVER_HOST}/cars/${this.props.match.params.id}`, carObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {             
            this.setState({redirectToDisplayAllCars:true})
        })
        .catch(err => 
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
    }


    render() 
    {
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        } 
        
        return (
            <div className="form-container">
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars"/> : null}  
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="model" value={this.state.model} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}