import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

function handleScroll() {
  var element = document.querySelector(".navbar");
  var scroll = window.scrollY || window.pageYOffset;

  if (element) {
    if (scroll > 550) {
      element.style.transition = "background-color 0.6s, color 0.6s"; // Adding transition for smooth color change
      element.style.background = "#E53D1C";
      element.style.color = "#000"; // Change text color to black when scroll position is greater than 550 pixels
    } else {
      element.style.transition = "background-color 0.6s, color 0.6s"; // Adding transition for smooth color change
      element.style.background =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.26), transparent)";
      element.style.color = "#E53D1C"; // Change text color back to original when scroll position is less than or equal to 550 pixels
    }
  }
}

document.addEventListener("scroll", handleScroll);

ReactDOM.render(<App />, document.getElementById(`root`));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
