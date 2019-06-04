import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import { spotifyApi } from "../../utils";

const Playlist = ({ userId, playlistData }) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    spotifyApi.getPlaylistTracks(userId, playlistData.id).then(res => {
      // console.log(res);
      setPlaylistTracks(res.items);
    });
  }, []);

  const toggleTrackList = () => {
    setShowTracks(!showTracks);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="playlist-header">
          <img src={playlistData.images[1]} alt="" />
          <h5 onClick={toggleTrackList}>{playlistData.name}</h5>
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
  );
};

export default Playlist;
