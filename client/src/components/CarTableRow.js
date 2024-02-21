import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal"

import axios from "axios";

import {
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_ADMIN,
  SERVER_HOST,
} from "../config/global_constants";

import BuyCar from "./BuyCar";

export default class CarTableRow extends Component {
  
  componentDidMount() {
    this.props.car.photos.forEach((photo) => {
      axios
        .get(`${SERVER_HOST}/cars/photo/${photo.filename}`)
        .then((res) => {
          document.getElementById(photo._id).src = `data:;base64,${res.data.image}`;
        })
        .catch((err) => {
          // Handle error
        });
    });
  }

  render() {


    let soldOrForSale = null;
    if (localStorage.accessLevel <= ACCESS_LEVEL_GUEST) {
      if (this.props.car.sold !== true) {
        soldOrForSale = (
          <BuyCar carID={this.props.car._id} price={this.props.car.price} />
        );
      } else {
        soldOrForSale = "SOLD";
      }
    }

    return (

      <div>
        <div className="itemsBox">
          <div className="carPhotos">
            {" "}
            {this.props.car.photos.map((photo) => (
              <img key={photo._id} id={photo._id}  alt="" />
            ))}
          </div>
          <h3>{this.props.car.name}</h3>
          <i>€{this.props.car.price}</i>
          {/* <b>
            {this.props.car.colour} || {this.props.car.year}
          </b>
          <p>
            {this.props.car.price} || {this.props.car.size}
          </p>
          <p>
            {this.props.car.gender} || {this.props.car.fabric}
          </p> */}
          {/* <p>{this.props.car.description}</p> */}
          <p>
            {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
              <Link
                className="green-button"
                to={"/EditCar/" + this.props.car._id}
              >
                Edit
              </Link>
            ) : null}

            {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
              <Link
                className="red-button"
                to={"/DeleteCar/" + this.props.car._id}
              >
                Delete
              </Link>
            ) : null}

            {soldOrForSale}
          </p>
          {/* <tr>
            <td>{this.props.car.name}</td>
            <td>{this.props.car.colour}</td>
            <td>{this.props.car.year}</td>
            <td>{this.props.car.price}</td>
            <td>{this.props.car.size}</td>
            <td>{this.props.car.gender}</td>
            <td>{this.props.car.fabric}</td>
            <td>{this.props.car.description}</td>
            <td className="carPhotos">
              {this.props.car.photos.map((photo) => (
                <img key={photo._id} id={photo._id} alt="" />
              ))}
            </td>
            <td>
              {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
                <Link
                  className="green-button"
                  to={"/EditCar/" + this.props.car._id}
                >
                  Edit
                </Link>
              ) : null}

              {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
                <Link
                  className="red-button"
                  to={"/DeleteCar/" + this.props.car._id}
                >
                  Delete
                </Link>
              ) : null}

              {soldOrForSale}
            </td>
          </tr> */}
        </div>
      </div>
    );
  }
}
