import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";

import {
  ACCESS_LEVEL_NORMAL_USER,
  SERVER_HOST,
} from "../config/global_constants";

export default class EditCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ``,
      colour: ``,
      year: ``,
      price: ``,
      size: ``,
      gender: ``,
      fabric: ``,
      description: ``,
      redirectToDisplayAllCars:
        localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
      wasSubmittedAtLeastOnce: false,
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();

    axios
      .get(`${SERVER_HOST}/cars/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        this.setState({
          name: res.data.name,
          colour: res.data.colour,
          year: res.data.year,
          price: res.data.price,
          size: res.data.size,
          gender: res.data.gender,
          fabric: res.data.fabric,
          description: res.data.description,
        });
      })
      .catch((err) => {
        // do nothing
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const carObject = {
      name: this.state.name,
      colour: this.state.colour,
      year: this.state.year,
      price: this.state.price,
      size: this.state.size,
      gender: this.state.gender,
      fabric: this.state.fabric,
      description: this.state.description,
    };

    axios
      .put(`${SERVER_HOST}/cars/${this.props.match.params.id}`, carObject, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        this.setState({ redirectToDisplayAllCars: true });
      })
      .catch((err) => {
        this.setState({ wasSubmittedAtLeastOnce: true });
      });
  };

  render() {
    let errorMessage = "";
    if (this.state.wasSubmittedAtLeastOnce) {
      errorMessage = (
        <div className="error">
          Error: All fields must be filled in
          <br />
        </div>
      );
    }

    return (
      <div className="forms">
        {this.state.redirectToDisplayAllCars ? (
          <Redirect to="/DisplayAllCars" />
        ) : null}

        {errorMessage}

        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={(input) => {
                this.inputToFocus = input;
              }}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="colour">
            <Form.Label>Colour</Form.Label>
            <Form.Control
              className="dropdown"
              as="select"
              name="colour"
              value={this.state.colour}
              onChange={this.handleChange}
            >
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="grey">Grey</option>
              <option value="multi">Multi</option>
              <option value="beige">Beige</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
              {this.state.colour && (
                <option value={this.state.colour} selected>
                  {this.state.colour}
                </option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              className="dropdown"
              as="select"
              name="size"
              value={this.state.size}
              onChange={this.handleChange}
            >
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              {this.state.size && (
                <option value={this.state.size} selected>
                  {this.state.size}
                </option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              className="dropdown"
              as="select"
              name="gender"
              value={this.state.gender}
              onChange={this.handleChange}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              {this.state.gender && (
                <option value={this.state.gender} selected>
                  {this.state.gender}
                </option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="fabric">
            <Form.Label>Fabric</Form.Label>
            <Form.Control
              className="dropdown"
              as="select"
              name="fabric"
              value={this.state.fabric}
              onChange={this.handleChange}
            >
              <option value="cotton">Cotton</option>
              <option value="polyester">Polyester</option>
              <option value="silk">Silk</option>
              {this.state.fabric && (
                <option value={this.state.fabric} selected>
                  {this.state.fabric}
                </option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4} 
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>

          <LinkInClass
            value="Update"
            className="green-button"
            onClick={this.handleSubmit}
          />

          <Link className="red-button" to={"/DisplayAllCars"}>
            Cancel
          </Link>
        </Form>
      </div>
    );
  }
}
