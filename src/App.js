import React, { useState, useEffect, Fragment } from "react";

import Summary from "./Components/Summary/Summary";
import TopArtists from "./Components/TopArtists/TopArtists";
import TopTracks from "./Components/TopTracks/TopTracks";
import Header from "./Components/Header/Header";
import FollowedArtists from "./Components/FollowedArtists/FollowedArtists";
import Playlists from "./Components/Playlists/Playlists";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faPlayCircle
} from "@fortawesome/free-solid-svg-icons";

import { Switch, Route } from "react-router-dom";
import { spotifyApi } from "./utils";

import "./scss/materialize/materialize.scss";
import "./App.scss";

library.add(faPlay, faPause, faStepForward, faStepBackward, faPlayCircle);

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
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-collaborative"
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
  const [userData, setUserData] = useState({});
  const [songChanged, setSongChanged] = useState(false);

  useEffect(() => {
    let _token = hash.access_token || window.localStorage.token;

    setToken(_token);
    spotifyApi.setAccessToken(_token);
    window.localStorage.setItem("token", _token);

    if (token) {
      spotifyApi.getMe().then(res => setUserData(res));
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
          <Header songChanged={songChanged} setToken={setToken} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Summary} />
              <Route path="/top-tracks" component={TopTracks} />
              <Route path="/top-artists" component={TopArtists} />
              <Route path="/followed-artists" component={FollowedArtists} />
              <Route
                path="/playlists"
                render={() => (
                  <Playlists
                    userId={userData.id}
                    setSongChanged={setSongChanged}
                    songChanged={songChanged}
                    setToken={setToken}
                  />
                )}
              />
            </Switch>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default App;
