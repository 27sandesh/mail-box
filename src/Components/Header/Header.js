import React from "react";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <NavLink as={Link} to="/Home">
        Home
      </NavLink>
      <div>
        <NavLink as={Link} to="/Login">
          Login
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
