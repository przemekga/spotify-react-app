import React, { useEffect, useState } from "react";
import Playlist from "../Playlist/Playlist";

import { spotifyApi } from "../../utils";

const Playlists = ({ userId }) => {
  const [playlistList, setPlaylistList] = useState([]);

  useEffect(() => {
    spotifyApi.getUserPlaylists(userId).then(res => {
      setPlaylistList(res.items);
      console.log(res);
    });
  }, []);
  return (
    <>
      <h1>Playlists:</h1>
      {playlistList.map(playlistData => {
        return (
          <Playlist
            key={playlistData.id}
            userId={userId}
            playlistData={playlistData}
          />
        );
      })}
    </>
  );
};

export default Playlists;
