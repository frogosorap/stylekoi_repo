import React, { Component } from "react";

class Modal extends Component {
    render() {
        const { isOpen, onClose, car, photoId, carPhotos, isImageClicked } = this.props;
      
        if (!isOpen) return null;
      
        const selectedPhoto = carPhotos.find((photo) => photo._id === photoId);

        return (
          <div className="modal">
            <div className="modal-content">
              <div className ="modal-flex">

                <div className="modal-text">
                  <span className="close" onClick={onClose}>&times;</span>
                  <h1>{car.name}</h1>
                  <p>Price: €{car.price}</p>
                  <p>Gender: {car.gender}</p>
                  <p>Colour: {car.colour}</p>
                  <p>Size: {car.size}</p>
                  <p>Fabric: {car.fabric}</p>
                  <p>Description: {car.description}</p>
                </div>

                <div className="modal-image">
                {selectedPhoto && <img src={`data:;base64,${selectedPhoto.image}`} alt="" />}

                </div>

              </div>
            </div>
          </div>
        );
      }
    }

export default Modal;