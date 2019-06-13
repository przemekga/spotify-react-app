import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import { spotifyApi } from "../../utils";

import "./Playlist.scss";

const Playlist = ({ userId, playlistData, setSongChanged, songChanged }) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    spotifyApi.getPlaylistTracks(userId, playlistData.id).then(res => {
      // console.log(res);
      setPlaylistTracks(res.items);
    });
  }, []);

  if (!playlistData.images.length) {
    playlistData.images.push({ url: "https://placehold.it/300x300" });
  }

  const toggleTrackList = () => {
    setShowTracks(!showTracks);
  };

  const play = uri => {
    spotifyApi.play({ context_uri: uri }).then(() => {
      setSongChanged(!songChanged);
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="playlist">
          <div className="playlist-header">
            <div className="playlist-tmb">
              <img src={playlistData.images[0].url} alt="" />
            </div>
            <div className="desc">
              <h5 onClick={toggleTrackList}>{playlistData.name}</h5>
              <p>
                Created by: <strong>{playlistData.owner.display_name}</strong> &middot;{" "}
                {playlistData.tracks.total} songs 
              </p>
              <div className="playlist-controls">
                <button className="btn" onClick={() => play(playlistData.uri)}>
                  Play
                </button>
                <button className="btn" onClick={toggleTrackList}>
                  Show songs
                </button>
              </div>
            </div>
          </div>
          {showTracks &&
            playlistTracks.map(item => (
              <Track
                key={item.track.id}
                image={item.track.album.images[2].url}
                artist={item.track.artists[0].name}
                title={item.track.name}
                length={item.track.duration_ms}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
