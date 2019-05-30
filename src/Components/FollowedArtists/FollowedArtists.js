import React, { useState, useEffect } from "react";
import Artist from "../Artist/Artist";

import { spotifyApi } from "../../utils";

const FollowedArtists = () => {
  const [followedArtists, setFollowedArtists] = useState([]);

  useEffect(() => {
    spotifyApi
      .getFollowedArtists({
        limit: 50
      })
      .then(res => {
        setFollowedArtists(res.artists.items);
        console.log(res);
      });
  }, []);

  return (
    <div className="row">
      <h1>Your followed artists:</h1>
      {followedArtists.map(item => (
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
    </div>
  );
};

export default FollowedArtists;
