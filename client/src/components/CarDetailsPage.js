import React, { Component } from "react";
import axios from "axios";


import {
  ACCESS_LEVEL_GUEST,
  SERVER_HOST,
} from "../config/global_constants";

import BuyCar from "./BuyCar";

class CarDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "", // Initialize imageUrl state variable
    };
  }

  componentDidMount() {
    const { car } = this.props.location.state;
    const filename = car.photos.length > 0 ? car.photos[0].filename : ""; // Get the filename of the first photo

    // Fetch the image data from the server using the filename
    axios
      .get(`${SERVER_HOST}/cars/photo/${filename}`)
      .then((res) => {
        const imageUrl = `data:image/jpeg;base64,${res.data.image}`; // Construct the image URL
        this.setState({ imageUrl }); // Update the state with the image URL
      })
      .catch((err) => {
        // Handle error
        console.error("Error fetching image:", err);
      });
  }

  render() {
    
    let soldOrForSale = null;
    if (localStorage.accessLevel <= ACCESS_LEVEL_GUEST) {
      if (this.props.location.state.car.sold !== true) {
        soldOrForSale = (
          <BuyCar carID={this.props.location.state.car._id} price={this.props.location.state.car.price} />
        );
      } else {
        soldOrForSale = "SOLD";
      }
    }
    const { car } = this.props.location.state;
    
    return (
      <div className="product-details-container"> {/* Apply CSS class */}
        <div className="product-image"> {/* Apply CSS class */}
          {/* Display the image with the fetched image URL or a placeholder image */}
          <img src={this.state.imageUrl || 'placeholder.jpg'} alt="Car" />
        </div>
        <div className="product-info"> {/* Apply CSS class */}
          <h1 className="product-title">{car.name}</h1> {/* Apply CSS class */}
          <div className="product-price"> {/* Apply CSS class */}
            <p>Price: €{car.price}</p>
          </div>
          <div className="product-fabric">
            <p>Fabric: {car.fabric}</p>
          </div>
          <div className="product-description"> {/* Apply CSS class */}
            <p>Description: {car.description}</p>
          </div>
          <div>
          <p>
          {soldOrForSale}
          </p>
          </div>
          {/* Add more details as needed */}
        </div>
        
      </div>
    );
  }
}

export default CarDetailsPage;