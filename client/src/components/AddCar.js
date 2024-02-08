import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddCar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            model:"",
            colour:"",
            year:"",
            price:"",
            selectedFiles:null,
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
            wasSubmittedAtLeastOnce:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()                  
        formData.append("model", this.state.model)
        formData.append("colour", this.state.colour)
        formData.append("year", this.state.year)
        formData.append("price", this.state.price)
        
        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("carPhotos", this.state.selectedFiles[i])
            }
        }

        axios.post(`${SERVER_HOST}/cars`, formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
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
                    
                    <Form.Group controlId="photos">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control          
                        type = "file" multiple onChange = {this.handleFileChange}
                    /></Form.Group> <br/><br/>
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}