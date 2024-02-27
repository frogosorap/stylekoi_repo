import React, { Component } from "react";

class BasketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketItems: JSON.parse(localStorage.getItem("basketItems")) || [],
    };

    // Bind methods to the class instance
    this.handleDelete = this.handleDelete.bind(this);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
  }

  handleDelete(index) {
    const { basketItems } = this.state;
    const itemId = basketItems[index].id;
    const updatedBasketItems = basketItems.filter(item => item.id !== itemId);

    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    this.setState({ basketItems: updatedBasketItems });
  }

  handleIncreaseQuantity(id) {
    const { basketItems } = this.state;
    const updatedBasketItems = basketItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 0) + 1 }; // Initialize quantity to 0 if undefined
      }
      return item;
    });

    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    this.setState({ basketItems: updatedBasketItems });
  }

  handleDecreaseQuantity(id) {
    const { basketItems } = this.state;

    const updatedBasketItems = basketItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        const quantity = newQuantity >= 0 ? newQuantity : 0;
        return { ...item, quantity };
      }
      return item;
    });

    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    this.setState({ basketItems: updatedBasketItems });
  }

  render() {
    const { basketItems } = this.state;

    // Group items based on their IDs and count their quantities
    const groupedItems = {};
    basketItems.forEach(item => {
      if (!groupedItems[item.id]) {
        groupedItems[item.id] = { ...item, quantity: 0 };
      }
      groupedItems[item.id].quantity += 1; // Increment quantity
    });

    return (
      <div className="basket-page">
        <h1>Basket</h1>
        <table className="basket-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedItems).map((item, index) => (
              <tr key={index} className="basket-item">
                <td>{item.name}</td>
                <td>€{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={this.handleDelete.bind(this, index)}>Delete</button>
                  <button onClick={() => this.handleIncreaseQuantity(item.id)}>+</button>
                  <button onClick={() => this.handleDecreaseQuantity(item.id)}>-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BasketPage;