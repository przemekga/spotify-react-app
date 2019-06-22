import React, { useEffect, Fragment } from "react";

import Summary from "./Components/Summary/Summary";
import TopArtists from "./Components/TopArtists/TopArtists";
import TopTracks from "./Components/TopTracks/TopTracks";
import Header from "./Components/Header/Header";
import FollowedArtists from "./Components/FollowedArtists/FollowedArtists";
import Playlists from "./Components/Playlists/Playlists";
import TrackAnalysis from './Components/TrackAnalysis/TrackAnalysis';
import ArtistDetails from './Components/ArtistDetails/ArtistDetails';

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faPlayCircle,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

import { Switch, Route } from "react-router-dom";
import { spotifyApi } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserData } from "./store/actions/actions";

import "./scss/materialize/materialize.scss";
import "./App.scss";

library.add(faPlay, faPause, faStepForward, faStepBackward, faPlayCircle, faChartLine);

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
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    let _token = hash.access_token || window.localStorage.token;

    dispatch(setToken(_token));
    spotifyApi.setAccessToken(_token);
    window.localStorage.setItem("token", _token);

    if (Object.keys(userData).length === 0 && userData.constructor === Object) {
      spotifyApi
        .getMe()
        .then(res => dispatch(setUserData(res)))
        .catch(err => {
          if (err.status === 401) {
            setToken("");
          }
        });
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
              <Route path="/playlists" component={Playlists} />
              <Route path="/track/:id" component={TrackAnalysis} />
              <Route path="/artist/:id" component={ArtistDetails} />
            </Switch>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default App;
