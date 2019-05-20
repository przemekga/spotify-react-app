import React, { useState, useEffect } from "react";
import Artist from "../Artist/Artist";

import { spotifyApi } from "../../utils";

const TopArtist = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    spotifyApi
      .getMyTopArtists()
      .then(data => {
        console.log(data);
        setAlbums(data.items);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Your top artists:</h1>
      <ul className="album-list row">
        {albums.map(item => (
          <Artist
            key={item.id}
            name={item.name}
            image={item.images[1].url}
            col={6}
            tags={item.genres}
            followers={item.followers.total}
            id={item.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopArtist;
