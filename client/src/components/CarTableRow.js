import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Modal from "../components/Modal";

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
          document.getElementById(
            photo._id
          ).src = `data:;base64,${res.data.image}`;
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
        <Link
          to={{
            pathname: "/CarDetailsPage",
            state: { car: this.props.car }
          }}
        >
        <div className="itemsBox">
          <div className="carPhotos">
            {" "}
            {this.props.car.photos.map((photo) => (
              <img key={photo._id} id={photo._id} alt="" />
            ))}
          </div>
          <div className="details">
            <h3>{this.props.car.name}</h3>
            <i>€{this.props.car.price}</i>
          </div>
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
        </div>
        </Link>
      </div>
    );
  }
}
