import React, { useEffect, useState, memo } from "react";
import AudioIcon from "../AudioIcon/AudioIcon";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  startPlayback,
  stopPlayback
} from "../../store/actions/actions";

import { spotifyApi } from "../../utils";
import "./NowPlaying.scss";

const NowPlaying = memo(({ history }) => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [headerVisible, setHeaderVisible] = useState(true);
  const dispatch = useDispatch();
  const { songChanged, isPlaying } = useSelector(state => {
    return {
      songChanged: state.songChanged,
      isPlaying: state.isPlaying
    };
  });

  useEffect(() => {
    fetchCurrentTrack();
    history.listen(() => {
      fetchCurrentTrack();
    });
    window.addEventListener("scroll", trackScrolling);

    return function() {
      window.removeEventListener("scroll", trackScrolling);
    };
  }, [songChanged]);

  const isBottom = el => {
    return el.getBoundingClientRect().bottom <= 0;
  };

  const trackScrolling = () => {
    const wrappedElement = document.querySelector("nav");
    if (isBottom(wrappedElement)) {
      setHeaderVisible(false);
    } else {
      isBottom(wrappedElement);
      setHeaderVisible(true);
    }
  };

  const play = () => {
    spotifyApi
      .play({})
      .then(res => {
        dispatch(startPlayback());
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(setToken(""));
        }
      });
  };

  const pause = () => {
    spotifyApi
      .pause({})
      .then(res => {
        dispatch(stopPlayback());
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(setToken(""));
        }
      });
  };

  const playNext = () => {
    spotifyApi.skipToNext({}).then(() => {
      setTimeout(function() {
        // bez timeouta fetchCurrentTrack dostaje nieaktualne info o obecnie granym kawałku
        fetchCurrentTrack();
      }, 200);
    });
  };

  const playPrev = () => {
    spotifyApi.skipToPrevious({}).then(() => {
      setTimeout(function() {
        fetchCurrentTrack();
      }, 200);
    });
  };

  const fetchCurrentTrack = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then(res => {
        if (res !== "") {
          setCurrentTrack({
            artist: res.item.artists[0].name || "",
            track: res.item.name || "",
            deviceId: res.device.id
          });
          res.is_playing ? dispatch(startPlayback()) : dispatch(stopPlayback());
        } else {
          dispatch(stopPlayback());
        }
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(setToken(""));
        }
      });
  };

  const { artist, track } = currentTrack;

  return (
    <div className={headerVisible ? `NowPlaying` : "NowPlaying-scrolled"}>
      <>
        <div className="songTitle">
          {artist} - {track}
        </div>
        <div className="controls">
          <FontAwesomeIcon
            className="controls-icon"
            icon="step-backward"
            onClick={playPrev}
          />
          {isPlaying ? (
            <FontAwesomeIcon
              className="controls-icon"
              icon="pause"
              onClick={pause}
            />
          ) : (
            <FontAwesomeIcon
              className="controls-icon"
              icon="play"
              onClick={play}
            />
          )}
          <FontAwesomeIcon
            className="controls-icon"
            icon="step-forward"
            onClick={playNext}
          />
        </div>
        <AudioIcon pause={!isPlaying} />
      </>
    </div>
  );
});

export default withRouter(NowPlaying);
