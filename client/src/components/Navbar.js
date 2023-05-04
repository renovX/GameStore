import React from "react";
import TemporaryDrawer from "./Drawer";
import "./Navbar.css";
import Profile from "./Profile";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="nav-wrapper">
        <div className="grad-bar"></div>
        <nav className="navbar">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
            alt="Company Logo"
          />
          <div className="menu-toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="nav no-search">
            <li className="nav-item">
              <Link to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a href="/">About</a>
            </li>
            <li className="nav-item">
              <a href="/">Work</a>
            </li>
            <li className="nav-item">
              <a href="/">Careers</a>
            </li>
            <li className="nav-item">
              <a href="/">Contact Us</a>
            </li>
            <li className="nav-item">
              <TemporaryDrawer />
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
