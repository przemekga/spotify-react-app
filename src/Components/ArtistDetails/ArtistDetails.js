import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import AlbumCard from "../AlbumCard/AlbumCard";
import Artist from "../Artist/Artist";
import PresentationHeader from "../PresentationHeader/PresentationHeader";

import "./ArtistDetails.scss";

import { spotifyApi } from "../../utils";

const ArtistDetails = ({ match, history }) => {
  const [artistData, setArtistData] = useState();

  useEffect(() => {
    const id = match.params.id;
    getArtistData(id).then(res => {
      setArtistData(res);
      console.log(res);
    });
    history.listen((location, action) => {
      window.scrollTo(0, 0);
    });
  }, [match.params.id]);

  async function getArtistData(id) {
    const summary = spotifyApi.getArtist(id);
    const albums = spotifyApi.getArtistAlbums(id, {
      include_groups: "album",
      limit: 50
    });
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
          <PresentationHeader
            image={artistData.summary.images[0].url}
            name={artistData.summary.name}
            followers={artistData.summary.followers.total}
            tags={artistData.summary.genres}
          />
          <div className="col-12">
            <h4>Top tracks:</h4>
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
            <h4>Albums:</h4>
            <div className="row">
              {artistData.albums.items.map(item => {
                return (
                  <div
                    key={item.id}
                    className="col-6 col-sm-6 col-md-4 col-lg-3"
                  >
                    <AlbumCard data={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12">
            <h4>Related Artists</h4>
            <div className="row">
              {artistData.relatedArtists.artists.map(item => {
                if (item.images.length === 0)
                  item.images[1] = { url: "https://placehold.it/300x300" };
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
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArtistDetails;
