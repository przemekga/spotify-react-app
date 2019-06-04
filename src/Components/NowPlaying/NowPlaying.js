import React, { useEffect, useState, memo } from "react";
import AudioIcon from "../AudioIcon/AudioIcon";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { spotifyApi, transformUnix } from "../../utils";
import "./NowPlaying.scss";

const NowPlaying = memo(({ history }) => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchCurrentTrack();
    history.listen(() => {
      fetchCurrentTrack();
    });
  }, []);

  const play = () => {
    spotifyApi
      .play({})
      .then(res => {
        setIsPlaying(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const pause = () => {
    spotifyApi
      .pause({})
      .then(res => {
        setIsPlaying(false);
      })
      .catch(err => {
        console.log(err);
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
    spotifyApi.getMyCurrentPlaybackState().then(res => {
      if (res !== "") {
        setCurrentTrack({
          artist: res.item.artists[0].name || "",
          track: res.item.name || "",
          deviceId: res.device.id
        });
        setIsPlaying(res.is_playing);
      } else {
        setIsPlaying(false);
      }
    });
  };

  const { artist, track } = currentTrack;

  return (
    <div className="NowPlaying">
      <>
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
        <div>
          {artist} - {track}
        </div>
        <AudioIcon pause={!isPlaying} />
      </>
    </div>
  );
});

export default withRouter(NowPlaying);
