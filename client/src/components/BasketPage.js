import React, { Component } from "react";

class BasketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketItems: JSON.parse(localStorage.getItem("basketItems")) || [],
    };
  }

  render() {
    const { basketItems } = this.state;
    return (
      <div className="basket-page">
        <h1>Basket</h1>
        <div className="basket-items">
          {basketItems.map((item, index) => (
            <div key={index} className="basket-item">
              <p>Name: {item.name}</p>
              <p>Price: €{item.price}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BasketPage;