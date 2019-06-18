import React, { useEffect, useState } from "react";
import Playlist from "../Playlist/Playlist";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/actions/actions";
import { spotifyApi } from "../../utils";

const Playlists = ({ userId, setSongChanged, songChanged }) => {
  const [playlistList, setPlaylistList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    spotifyApi
      .getUserPlaylists(userId)
      .then(res => {
        setPlaylistList(res.items);
        // console.log(res);
      })
      .catch(err => {
        if (err.status === 401) {
          dispatch(setToken(""));
        }
      });
  }, []);
  return (
    <>
      <h1>Playlists:</h1>
      {playlistList.map(playlistData => {
        if (!playlistData.images.length) {
          playlistData.images.push({ url: "https://placehold.it/300x300" });
        }
        return (
          <Playlist
            key={playlistData.id}
            userId={userId}
            playlistData={playlistData}
            setSongChanged={setSongChanged}
            songChanged={songChanged}
          />
        );
      })}
    </>
  );
};

export default Playlists;
