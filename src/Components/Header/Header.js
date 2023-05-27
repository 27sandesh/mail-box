import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { AuthAction, dataAction } from "../Store";
import { useHistory } from "react-router-dom";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const Auth = useSelector((state) => state.auth.isAuthciated);
  const newMsgCount = useSelector((state) => state.data.newMsgCount);

  const toggleMenuHandler = () => {
    setMenuOpen(!menuOpen);
  };
  const logoutHandler = () => {
    dispatch(AuthAction.logout());
    history.replace("/Login");
  };

  return (
    <header className="header">
      <nav className={menuOpen ? "menu open" : "menu"}>
        <ul className="menu-list">
          {Auth && (
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
          )}
          {!Auth && (
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
          )}
          {Auth && (
            <li className="menu-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/Inbox"
                onClick={toggleMenuHandler}
              >
                Inbox({newMsgCount})
              </NavLink>
            </li>
          )}
          {Auth && (
            <li>
              <NavLink exact to="/SentBox">
                SentBox
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {Auth && (
        <button onClick={logoutHandler} className="buton">
          logout
        </button>
      )}
    </header>
  );
};

export default Header;
