import React, { useState, useEffect, Fragment } from "react";

import Summary from "./Components/Summary/Summary";
import TopArtists from "./Components/TopArtists/TopArtists";
import TopTracks from "./Components/TopTracks/TopTracks";
import Header from "./Components/Header/Header";
import FollowedArtists from "./Components/FollowedArtists/FollowedArtists";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward
} from "@fortawesome/free-solid-svg-icons";

import { Switch, Route } from "react-router-dom";
import { spotifyApi } from "./utils";

import "./scss/materialize/materialize.scss";
import "./App.scss";

library.add(faPlay, faPause, faStepForward, faStepBackward);

export const authEndpoint = "https://accounts.spotify.com/authorize?";

const clientId = "10fa5b3ca0fe4299923fecd6424038df";
const redirectUri = process.env.REACT_APP_URL;
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-follow-modify",
  "user-follow-read",
  "app-remote-control",
  "user-modify-playback-state"
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    let _token = hash.access_token || window.localStorage.token;
    let timestamp = window.localStorage.tokenTimestamp || Date.now();
    const expiresIn = timestamp + 36000000;

    setToken(_token);
    spotifyApi.setAccessToken(_token);
    window.localStorage.setItem("token", _token);
    window.localStorage.setItem("tokenTimestamp", Date.now());

    if (timestamp >= expiresIn) {
      setToken("");
    }
  }, []);

  return (
    <div className="App">
      {!token && (
        <a
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translateX(-50%)"
          }}
          className="btn btn--loginApp-link"
          href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {token && (
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Summary} />
              <Route path="/top-tracks" component={TopTracks} />
              <Route path="/top-artists" component={TopArtists} />
              <Route path="/followed-artists" component={FollowedArtists} />
            </Switch>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default App;
