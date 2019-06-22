import React, { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import Track from "../Track/Track";

import "./ArtistDetails.scss";

import { spotifyApi } from "../../utils";

const ArtistDetails = ({ match }) => {
  const [artistData, setArtistData] = useState();

  useEffect(() => {
    const id = match.params.id;
    getArtistData(id).then(res => {
      setArtistData(res);
      console.log(res);
    });
  }, []);

  async function getArtistData(id) {
    const summary = spotifyApi.getArtist(id);
    const albums = spotifyApi.getArtistAlbums(id);
    const relatedArtists = spotifyApi.getArtistRelatedArtists(id);
    const topTracks = spotifyApi.getArtistTopTracks(id, "from_token");

    const finalResult = {
      summary: await summary,
      albums: await albums,
      relatedArtists: await relatedArtists,
      topTracks: await topTracks
    };
    return finalResult;
  }

  return (
    <div className="row">
      {artistData ? (
        <>
          <div className="col-12">
            <div className="artist-header">
              <img src={artistData.summary.images[0].url} alt="" />
              <h4>{artistData.summary.name}</h4>
            </div>
            <div className="d-flex align-items-center">
              <p className="mr-4">
                Followers: {artistData.summary.followers.total}
              </p>
              <div>
                {artistData.summary.genres.map((item, index) => (
                  <Tag name={item} key={index} limit={false} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12">
            <h5>Top tracks:</h5>
            <ul>
              {artistData.topTracks.tracks.map(item => (
                <Track
                  key={item.id}
                  image={item.album.images[2].url}
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
          <div className="col-12">
            <h5>Albums:</h5>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArtistDetails;
