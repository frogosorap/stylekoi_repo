import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

import axios from "axios";

import LinkInClass from "../components/LinkInClass";

import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants";

export default class AddCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      colour: "",
      year: "",
      price: "",
      size: "",
      selectedFiles: null,
      redirectToDisplayAllCars: localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
      wasSubmittedAtLeastOnce: false,
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ selectedFiles: e.target.files });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("colour", this.state.colour);
    formData.append("year", 2024);
    formData.append("price", this.state.price);
    formData.append("size", this.state.size);
    formData.append("gender", this.state.gender);
    formData.append("fabric", this.state.fabric);
    formData.append("description", this.state.description);

    if (this.state.selectedFiles) {
      for (let i = 0; i < this.state.selectedFiles.length; i++) {
        formData.append("carPhotos", this.state.selectedFiles[i]);
      }
    }

    axios
      .post(`${SERVER_HOST}/cars`, formData, {
        headers: {
          authorization: localStorage.token,
          "Content-type": "multipart/form-data",
        },
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
              <option value="">Select Color</option>
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
              <option value="">Select Size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
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
              <option value="">Select Fabric</option>
              <option value="cotton">Cotton</option>
              <option value="polyester">Polyester</option>
              <option value="silk">Silk</option>
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
          <Form.Group controlId="photos">
            <Form.Label>Photos [max 3]</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={this.handleFileChange}
            />
          </Form.Group>{" "}
          <br />
          <br />
          <LinkInClass
            value="Add"
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
