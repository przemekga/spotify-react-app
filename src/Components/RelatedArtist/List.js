import React, { useEffect, useState } from "react";
import Line from "./Line";
import { spotifyApi } from "../../utils";

import "./List.css";

const List = ({ id }) => {
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    console.log(relatedArtists)
    if (!relatedArtists.length) {
      spotifyApi.getArtistRelatedArtists(id).then(res => {
        setRelatedArtists(res.artists);
        console.log(res.artists);
      });
    }
  }, []);

  return (
    <div className="row relatedArtistList">
      {relatedArtists.map(artist => {
        return (
          <Line
            key={artist.id}
            id={artist.id}
            name={artist.name}
            image={artist.images[0].url || "https://placehold.it/50x50"}
            genre={artist.genres[0]}
          />
        );
      })}
    </div>
  );
};

export default List;
