import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

// import CarTable from "./CarTable"
import ShirtGrid from "./ShirtGrid";
import Logout from "./Logout";

import {
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_ADMIN,
  SERVER_HOST,
} from "../config/global_constants";

export default class MenShirts extends Component {
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
      const womenShirts = res.data.filter((shirt) => shirt.gender === "F");
      this.setState({ cars: womenShirts });
    })
    .catch((err) => {
      console.error("Error fetching women's shirts:", err);
    });
  }

  render() {
    return (
    
        <div className="table-container">
          <h2 style={{ textAlign: "center" }}>WOMEN'S COLLECTION</h2>
          <ShirtGrid cars={this.state.cars} />

          {/* {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
            <div className="add-new-car">
              <Link className="blue-button" to={"/AddCar"}>
                Add New Item
              </Link>
            </div>
          ) : null} */}
        </div>
    );
  }
}
