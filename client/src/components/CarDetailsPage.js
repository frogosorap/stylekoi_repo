// import React, { Component } from "react";
// import axios from "axios";
// import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants";
// import BuyCar from "./BuyCar";

// class CarDetailsPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentIndex: 0,
//       imageUrl: "",
//       basketItems: JSON.parse(localStorage.getItem("basketItems")) || [], // Initialize basketItems from local storage
//     };
//   }

//   componentDidMount() {
//     const { car } = this.props.location.state;
//     const filename = car.photos.length > 0 ? car.photos[0].filename : "";


//     axios
//       .get(`${SERVER_HOST}/cars/photo/${filename}`)
//       .then((res) => {
//         const imageUrl = `data:image/jpeg;base64,${res.data.image}`;
//         this.setState({ imageUrl });
//       })
//       .catch((err) => {
//         console.error("Error fetching image:", err);
//       });
//   }


//   addToBasket() {
//     const { car } = this.props.location.state;
//     const filename = car.photos.length > 0 ? car.photos[0].filename : "";
//     axios
//       .get(`${SERVER_HOST}/cars/photo/${filename}`)
//       .then((res) => {
//         const imageUrl = `data:image/jpeg;base64,${res.data.image}`;

//         const newItem = {
//           id: car._id,
//           name: car.name,
//           price: car.price,
//           imageUrl: imageUrl, // Add imageUrl to newItem
//           quantity: 1, // Initialize quantity to 1 when adding to basket
//         };

//         let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];
//         basketItems.push(newItem);
//         localStorage.setItem("basketItems", JSON.stringify(basketItems));
//         this.setState({ basketItems: basketItems });
//       })
//       .catch((err) => {
//         console.error("Error fetching image:", err);
//       });
//   }

//   render() {
//     const { car } = this.props.location.state;

//     return (
//       <div className="product-details-container">
//         <div className="product-image">
//           <img src={this.state.imageUrl || "placeholder.jpg"} alt="Car" />
          
//         </div>
//         <div className="product-info">
//           <h1 className="product-title">{car.name}</h1>
//           <div className="product-price">
//             <p>Price: €{car.price}</p>
//           </div>
//           <div className="product-fabric">
//             <p>Fabric: {car.fabric}</p>
//           </div>
//           <div className="product-description">
//             <p>Description: {car.description}</p>
//           </div>
//           <div>
//             {localStorage.accessLevel <= ACCESS_LEVEL_GUEST &&
//               (this.props.location.state.car.sold !== true ? (
//                 <React.Fragment>
//                   <button
//                     className="basket-button"
//                     onClick={() => this.addToBasket()}
//                   >
//                     Add to Basket
//                   </button>
//                   <BuyCar
//                     carID={this.props.location.state.car._id}
//                     price={this.props.location.state.car.price}
//                   />
//                 </React.Fragment>
//               ) : (
//                 "SOLD"
//               ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default CarDetailsPage;

import React, { Component } from "react";
import axios from "axios";
import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants";
import BuyCar from "./BuyCar";

class CarDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      imageUrls: [],
      basketItems: JSON.parse(localStorage.getItem("basketItems")) || [],
    };
  }

  componentDidMount() {
    const { car } = this.props.location.state;
    const imageUrls = car.photos.map((photo) => `${SERVER_HOST}/cars/photo/${photo.filename}`);
    
    this.setState({ imageUrls }, () => {
      this.loadImage(this.state.currentIndex);
    });
  }

  loadImage(index) {
    const imageUrl = this.state.imageUrls[index];
    document.getElementById("carImage").src = imageUrl;
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
        currentIndex: Math.min(prevState.currentIndex + 1, this.state.imageUrls.length - 1),
      }),
      () => this.loadImage(this.state.currentIndex)
    );
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
    this.setState({ basketItems: basketItems });
  }

  render() {
    const { car } = this.props.location.state;
    const { currentIndex, imageUrls } = this.state;

    return (
      <div className="product-details-container">
        <div className="product-image">
          <img id="carImage" src={imageUrls[currentIndex] || "placeholder.jpg"} alt="Car" />
          {imageUrls.length > 1 && (
            <>
              <div className="prev" onClick={() => this.handlePrevClick()}>
                &lt;
              </div>
              <div className="next" onClick={() => this.handleNextClick()}>
                &gt;
              </div>
            </>
          )}
        </div>
        <div className="product-info">
          <h1 className="product-title">{car.name}</h1>
          {/* ... other details ... */}
          <div>
            {localStorage.accessLevel <= ACCESS_LEVEL_GUEST &&
              (this.props.location.state.car.sold !== true ? (
                <React.Fragment>
                  <button className="basket-button" onClick={() => this.addToBasket()}>
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
    );
  }
}

export default CarDetailsPage;
