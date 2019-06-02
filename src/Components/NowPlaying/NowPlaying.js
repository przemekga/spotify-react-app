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

  const fetchCurrentTrack = () => {
    spotifyApi.getMyCurrentPlaybackState().then(res => {
      if (res !== "") {
        setCurrentTrack({
          artist: res.item.artists[0].name || "",
          track: res.item.name || "",
          deviceId: res.device.id
        });
        setIsPlaying(true);
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
          {isPlaying ? (
            <FontAwesomeIcon icon="pause" onClick={() => pause()} />
          ) : (
            <FontAwesomeIcon icon="play" onClick={() => play()} />
          )}
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
