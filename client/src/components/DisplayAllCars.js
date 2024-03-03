import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import CarTable from "./CarTable";
import ShirtGrid from "./ShirtGrid";
import Logout from "./Logout";

import {
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_ADMIN,
  SERVER_HOST,
} from "../config/global_constants";

export default class DisplayAllCars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/cars`)
      .then((res) => {
        this.setState({ cars: res.data });
      })
      .catch((err) => {
        // do nothing
      });
  }

  // removed the pfp code here to app.js and profilepicture.js
  render() {
    return (
      <div className="form-container">
        <div className="table-container">
          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
            <div className="add-new-car">
              <Link className="blue-button" to={"/AddCar"}>
                Add <i class="fas fa-tshirt"></i>
              </Link>
            </div>
          ) : null}
          <div className="h2">
            <h2>COLLECTION</h2>
          </div>
          <ShirtGrid cars={this.state.cars} />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
