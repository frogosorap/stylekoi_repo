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
        return { ...item, quantity: (item.quantity || 0) + 1 }; // Increment quantity
      }
      return item;
    });
    console.log(updatedBasketItems)

    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    this.setState({ basketItems: updatedBasketItems });
  }
  
  handleDecreaseQuantity(id) {
    const { basketItems } = this.state;
  
    const updatedBasketItems = basketItems.map(item => {
      if (item.id === id) {
        const newQuantity = (item.quantity || 0) - 1;
        const quantity = newQuantity >= 0 ? newQuantity : 0;
        return { ...item, quantity };
      }
      return item;
    });
    console.log(updatedBasketItems)
    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    this.setState({ basketItems: updatedBasketItems });
  }

  render() {

    const { basketItems } = this.state;

    // Group items based on their IDs and initialize their quantities
    const groupedItems = {};
    basketItems.forEach(item => {
      const { id, name, price } = item;
      const quantity = item.quantity || 0; // Set quantity to 0 if not provided
      if (!groupedItems[id]) {
        groupedItems[id] = { id, name, price, quantity };
      } else {
        groupedItems[id].quantity += quantity; // Add to existing quantity
      }
    });

    // Calculate total price of all items
    const totalPrice = Object.values(groupedItems).reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    return (
      <div className="basket-page">
        <h1>Basket</h1>
        <table className="basket-table">
          <tbody>
            {Object.values(groupedItems).map((item, index) => (
              <tr key={index} className="basket-item">
                <td>{item.name}</td>
                <td>€{item.price}</td>
                <td>
                  <button onClick={() => this.handleIncreaseQuantity(item.id)}>+</button>
                  {item.quantity}
                  <button onClick={() => this.handleDecreaseQuantity(item.id)}>-</button>
                </td>
                <td>€{(item.price * item.quantity).toFixed(2)}</td>
                <td><button onClick={this.handleDelete.bind(this, index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price">
          Total Price: €{totalPrice.toFixed(2)}
        </div>
      </div>
    );
  }
}

export default BasketPage;