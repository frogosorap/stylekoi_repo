import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BuyCar from "./BuyCar";
import {
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_ADMIN,
  SERVER_HOST,
} from "../config/global_constants";

class CarTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0, // Track the current index of the displayed image
    };
  }

  componentDidMount() {
    this.loadImage(this.state.currentIndex);
  }

  loadImage(index) {
    const photo = this.props.car.photos[index];
    if (photo) {
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
    }
  }

  handlePrevClick() {
    this.setState(
      (prevState) => ({
        currentIndex: Math.max(prevState.currentIndex - 1, 0),
      }),
      () => this.loadImage(this.state.currentIndex)
    );
  }

  handleNextClick() {
    this.setState(
      (prevState) => ({
        currentIndex: Math.min(
          prevState.currentIndex + 1,
          this.props.car.photos.length - 1
        ),
      }),
      () => this.loadImage(this.state.currentIndex)
    );
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

    const { currentIndex } = this.state;
    const hasMultipleImages = this.props.car.photos.length > 1;

    return (
      <div>
        <div className="itemsBox">
          {hasMultipleImages && (
            <>
              <div className="prev" onClick={() => this.handlePrevClick()}>
                &lt;
              </div>
              <div className="carPhotos scrollable">
                <Link
                  to={{
                    pathname: "/CarDetailsPage",
                    state: { car: this.props.car },
                  }}
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <img
                    key={this.props.car.photos[currentIndex]._id}
                    id={this.props.car.photos[currentIndex]._id}
                    alt=""
                  />
                </Link>
              </div>

              <div className="next" onClick={() => this.handleNextClick()}>
                &gt;
              </div>
            </>
          )}

          {!hasMultipleImages && (
            <div className="carPhotos">
              {" "}
              {this.props.car.photos.map((photo) => (
                <Link
                  to={{
                    pathname: "/CarDetailsPage",
                    state: { car: this.props.car },
                  }}
                >
                  <img key={photo._id} id={photo._id} alt="" />
                </Link>
              ))}
            </div>
          )}
          <Link
            to={{
              pathname: "/CarDetailsPage",
              state: { car: this.props.car },
            }}
          >
            <div className="details">
              <h3>{this.props.car.name}</h3>
              <i>€{this.props.car.price}</i>
            </div>
          </Link>
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

            {/* {soldOrForSale} */}
          </p>
        </div>
      </div>
    );
  }
}

export default CarTableRow;
