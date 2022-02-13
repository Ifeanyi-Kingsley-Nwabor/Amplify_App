import React from "react";
import logo from "../logo.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <img src={logo} className="App-logo logo" alt="Logo" />
        <ul id="nav-mobile" className="right ">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
