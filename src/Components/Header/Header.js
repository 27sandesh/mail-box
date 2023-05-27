import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleMenuHandler}>
        <div className={menuOpen ? "menu-icon open" : "menu-icon"}></div>
      </button>
      <nav className={menuOpen ? "menu open" : "menu"}>
        <ul className="menu-list">
          <li className="menu-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              exact
              to="/Home"
              onClick={toggleMenuHandler}
            >
              Home
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              exact
              to="/Login"
              onClick={toggleMenuHandler}
            >
              Login
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              exact
              to="/Inbox"
              onClick={toggleMenuHandler}
            >
              Inbox
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/SentBox">
              SentBox
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
