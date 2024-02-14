import React, { Component } from "react";

class Modal extends Component {
    render() {
        const { isOpen, onClose, car, photoId, isImageClicked } = this.props;
      
        if (!isOpen) return null;
      
        return (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>&times;</span>
              <h1>{car.name}</h1>
              <p>Price: €{car.price}</p>
              <p>Gender: {car.gender}</p>
              <p>Colour: {car.colour}</p>
              <p>Size: {car.size}</p>
              <p>Fabric: {car.fabric}</p>
              <p>Description: {car.description}</p>
            </div>
          </div>
        );
      }
    }

export default Modal;