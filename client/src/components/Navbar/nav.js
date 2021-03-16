import React from "react";
import { Link } from "react-router-dom";
import "../../pages/Login";
import "../../pages/Register";
import "./style.css";

function Nav() {
  return (
    <nav>
      <div className="nav-wrapper">
      <img id="logo" src="https://img.icons8.com/ios/100/000000/tms-tree.png"/>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
