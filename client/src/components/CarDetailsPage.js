import React, { Component } from "react";
import axios from "axios";

import { SERVER_HOST } from "../config/global_constants";

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
          <div className="product-description"> {/* Apply CSS class */}
            <p>Description: {car.description}</p>
          </div>
          {/* Add more details as needed */}
        </div>
      </div>
    );
  }
}

export default CarDetailsPage;