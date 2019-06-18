import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import NowPlaying from "../NowPlaying/NowPlaying";
import "./Header.scss";
import M from "materialize-css";

const Header = () => {
  const sidenav = React.createRef();

  useEffect(() => {
    M.Sidenav.init(sidenav.current);
    console.log(sidenav);
  }, []);

  return (
    <header>
      <nav>
        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
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
          <li>
            <NavLink to="/followed-artists">Followed Artists</NavLink>
          </li>
          <li>
            <NavLink to="/playlists">Playlists</NavLink>
          </li>
        </ul>
        <NowPlaying />
      </nav>
      <ul id="slide-out" className="sidenav" ref={sidenav}>
        <li>
          <NavLink to="/">Summary</NavLink>
        </li>
        <li>
          <NavLink to="/top-tracks">Top Tracks</NavLink>
        </li>
        <li>
          <NavLink to="/top-artists">Top Artists</NavLink>
        </li>
        <li>
          <NavLink to="/followed-artists">Followed Artists</NavLink>
        </li>
        <li>
          <NavLink to="/playlists">Playlists</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
