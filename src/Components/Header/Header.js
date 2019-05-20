import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <nav>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li>
          <NavLink to="/">Summary</NavLink>
        </li>
        <li>
          <NavLink to="/top-tracks">Top Tracks</NavLink>
        </li>
        <li>
          <NavLink to="/top-artists">Top Artists</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
