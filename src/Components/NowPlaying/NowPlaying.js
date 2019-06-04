import React, { useEffect, useState } from "react";
import AudioIcon from "../AudioIcon/AudioIcon";

import { spotifyApi, transformUnix } from "../../utils";
import "./NowPlaying.scss";

const NowPlaying = () => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    spotifyApi.getMyCurrentPlaybackState().then(res => {
      if (res !== undefined) {
        setCurrentTrack({
          artist: res.item.artists[0].name || "",
          track: res.item.name || ""
        });
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    });
  }, []);

  const { artist, track } = currentTrack;

  return (
    <div className="NowPlaying">
      {isPlaying ? (
        <>
          <div>
            {artist} - {track}
          </div>
          <AudioIcon />
        </>
      ) : (
        `Play something!`
      )}
    </div>
  );
};

export default NowPlaying;
