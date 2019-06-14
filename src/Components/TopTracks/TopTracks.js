import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import { spotifyApi } from "../../utils";
import "./TopTracks.scss";

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyApi.getMyTopTracks().then(res => {
      setTracks(res.items);
    });
  }, []);

  const saveAsPlaylist = () => {
    const uris = tracks.map(item => item.uri);
    const date = new Date(Date.now()).toLocaleString().split(",")[0];
    const playListName = `Top Tracks ${date}`;
    let userId = "";

    spotifyApi.getMe().then(res => {
      userId = res.id;
      spotifyApi
        .createPlaylist(userId, {
          name: playListName
        })
        .then(res => {
          spotifyApi.addTracksToPlaylist(userId, res.id, uris);
        });
    });
  };

  return (
    <div className="top-tracks">
      <div className="top-tracks-header">
        <h1>Your top tracks:</h1>
        <div className="btn" onClick={saveAsPlaylist}>
          Save as playlist
        </div>
      </div>
      <ul className="top-tracks-list">
        {tracks.map(trackData => (
          <Track
            key={trackData.id}
            image={trackData.album.images[2].url}
            artist={trackData.artists[0].name}
            title={trackData.name}
            length={trackData.duration_ms}
            trackId={trackData.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
