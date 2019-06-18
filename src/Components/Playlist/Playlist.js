import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import { useDispatch } from "react-redux";
import { songHasChanged } from "../../store/actions/actions";

import { spotifyApi } from "../../utils";

import "./Playlist.scss";

const Playlist = ({ userId, playlistData }) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [showTracks, setShowTracks] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  const toggleTrackList = () => {
    if (playlistTracks.length) {
      setShowTracks(!showTracks);
    } else {
      spotifyApi.getPlaylistTracks(userId, playlistData.id).then(res => {
        setPlaylistTracks(res.items);
        setShowTracks(!showTracks);
      });
    }
  };

  const play = uri => {
    spotifyApi.play({ context_uri: uri }).then(() => {
      dispatch(songHasChanged());
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
                Created by: <strong>{playlistData.owner.display_name}</strong>{" "}
                &middot; {playlistData.tracks.total} songs
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
                trackId={item.track.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
