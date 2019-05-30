import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import { spotifyApi } from "../../utils";
import './TopTracks.scss'

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyApi
      .getMyTopTracks()
      .then(res => {
        setTracks(res.items);
      })
  }, []);

  return (
    <div className="top-tracks">
      <h1>Your top tracks:</h1>
      <ul className="top-tracks-list">
        {tracks.map(item => (
          <Track
            key={item.id}
            image={item.album.images[2].url}
            artist={item.artists[0].name}
            title={item.name}
            length={item.duration_ms}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
