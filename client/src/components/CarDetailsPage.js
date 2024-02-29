import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import axios from "axios";
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST } from "../config/global_constants";
import BuyCar from "./BuyCar";

class CarDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      imageUrls: [], // Updated to store an array of image URLs
      basketItems: JSON.parse(localStorage.getItem("basketItems")) || [],
    };
  }

  componentDidMount() {
    const { car } = this.props.location.state;
    const filenames =
      car.photos.length > 0 ? car.photos.map((photo) => photo.filename) : [];

    const imageUrls = [];

    for (const filename of filenames) {
      axios
        .get(`${SERVER_HOST}/cars/photo/${filename}`)
        .then((res) => {
          const imageUrl = `data:image/jpeg;base64,${res.data.image}`;
          imageUrls.push(imageUrl);

          if (imageUrls.length === filenames.length) {
            this.setState({ imageUrls });
          }
        })
        .catch((err) => {
          console.error("Error fetching image:", err);
        });
    }
  }

  handlePrevClick() {
    this.setState((prevState) => ({
      currentIndex: Math.max(prevState.currentIndex - 1, 0),
    }));
  }

  handleNextClick() {
    this.setState((prevState) => ({
      currentIndex: Math.min(
        prevState.currentIndex + 1,
        this.state.imageUrls.length - 1
      ),
    }));
  }

  addToBasket() {
    const { car } = this.props.location.state;
    const imageUrl = this.state.imageUrls[this.state.currentIndex];

    const newItem = {
      id: car._id,
      name: car.name,
      price: car.price,
      imageUrl: imageUrl,
      quantity: 1,
    };

    let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];
    basketItems.push(newItem);
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
    this.setState({ basketItems });
  }

  render() {
    const { car } = this.props.location.state;
    const { currentIndex, imageUrls } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Link to="/DisplayAllCars" className="back-button">
            Back
          </Link>
        </BrowserRouter>
        <div className="product-details-container">
          <div className="product-image">
            {imageUrls.length > 0 && (
              <>
                {imageUrls.length > 1 && (
                  <div
                    className="arrow prev"
                    onClick={() => this.handlePrevClick()}
                  >
                    &lt;
                  </div>
                )}
                <img
                  id="carImage"
                  src={imageUrls[currentIndex] || "placeholder.jpg"}
                  alt="Car"
                />
                {imageUrls.length > 1 && (
                  <div
                    className="arrow next"
                    onClick={() => this.handleNextClick()}
                  >
                    &gt;
                  </div>
                )}
              </>
            )}
          </div>
          <div className="product-info">
            <h1 className="product-title">{car.name}</h1>
            <div className="product-price">
              <p>€{car.price}</p>
              {/* <p>Price: €{car.price}</p> */}
            </div>
            <div className="product-fabric">
              <p>Color: {car.colour}</p>
              <p>Size: {car.size}</p>
              <p>Fabric: {car.fabric}</p>
            </div>
            <div className="product-description">
              <p>
                Description: <br /> <p>{car.description}</p>
                <br />
              </p>
            </div>
            <div className="buy-item">
              {localStorage.accessLevel <= ACCESS_LEVEL_GUEST &&
                (this.props.location.state.car.sold !== true ? (
                  <React.Fragment>
                    <button
                      className="basket-button"
                      onClick={() => this.addToBasket()}
                    >
                      Add to Basket
                    </button>
                    <BuyCar
                      carID={this.props.location.state.car._id}
                      price={this.props.location.state.car.price}
                    />
                  </React.Fragment>
                ) : (
                  "SOLD"
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarDetailsPage;
