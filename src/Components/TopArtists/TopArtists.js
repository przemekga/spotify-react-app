import React, { useState, useEffect } from "react";
import Artist from "../Artist/Artist";

import { spotifyApi } from "../../utils";

const TopArtist = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    spotifyApi
      .getMyTopArtists()
      .then(data => {
        setAlbums(data.items);
        console.log(data);
        spotifyApi.getArtist("64tNsm6TnZe2zpcMVMOoHL").then(res => {
          console.log(res)
        })
        spotifyApi.getArtistTopTracks("64tNsm6TnZe2zpcMVMOoHL").then(res => {
          console.log(res)
        })
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Your top artists:</h1>
      <ul className="album-list row">
        {albums.map(item => {
          if (item.images.length === 0) item.images[1] = {url: 'https://placehold.it/300x300'}
          return (
            <Artist
              key={item.id}
              name={item.name}
              image={item.images[1].url}
              col={6}
              tags={item.genres}
              followers={item.followers.total}
              id={item.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TopArtist;
