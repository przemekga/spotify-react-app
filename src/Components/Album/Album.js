import React, { useState, useEffect } from "react";
import PresentationHeader from "../PresentationHeader/PresentationHeader";
import Track from "../Track/Track";

import { spotifyApi } from "../../utils";

const Album = ({ match }) => {
  const [albumData, setAlbumData] = useState();

  useEffect(() => {
    const id = match.params.id;
    spotifyApi.getAlbum(id);
    getAlbumData(id).then(res => {
      setAlbumData(res);
      console.log(res);
    });
  }, []);

  async function getAlbumData(id) {
    const summary = spotifyApi.getAlbum(id);
    const songs = spotifyApi.getAlbumTracks(id);

    const finalResult = {
      summary: await summary,
      songs: await songs
    };

    return finalResult;
  }

  return (
    <>
      {albumData ? (
        <div>
          <PresentationHeader
            image={albumData.summary.images[0].url}
            name={albumData.summary.name}
            secondLine={false}
          />
          <div className="col-12">
            <ul>
              {albumData.songs.items.map(item => (
                <Track
                  image={albumData.summary.images[0].url}
                  key={item.id}
                  artist={item.artists[0].name}
                  title={item.name}
                  length={item.duration_ms}
                  trackId={item.id}
                  popularity={item.popularity}
                  showName={false}
                />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Album;
