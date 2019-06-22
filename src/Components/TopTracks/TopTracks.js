import React, { useEffect, useState } from "react";
import Track from "../Track/Track";
import { Radar } from "nivo";
import { spotifyApi } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TopTracks.scss";

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    spotifyApi.getMyTopTracks().then(res => {
      setTracks(res.items);
      spotifyApi
        .getAudioFeaturesForTracks(res.items.map(item => item.id))
        .then(res => {
          const averages = res.audio_features
            .map(item => {
              return {
                danceability: item.danceability,
                energy: item.energy,
                speechiness: item.speechiness,
                acousticness: item.acousticness,
                instrumentalness: item.instrumentalness,
                liveness: item.liveness,
                valence: item.valence
              };
            })
            .reduce((prevVal, currentVal, id, arr) => {
              let acumulated = {
                danceability: prevVal.danceability + currentVal.danceability,
                energy: prevVal.energy + currentVal.energy,
                speechiness: prevVal.speechiness + currentVal.speechiness,
                acousticness: prevVal.acousticness + currentVal.acousticness,
                instrumentalness:
                  prevVal.instrumentalness + currentVal.instrumentalness,
                liveness: prevVal.liveness + currentVal.liveness,
                valence: prevVal.valence + currentVal.valence
              };
              if (id === arr.length - 1) {
                let averages = {};
                for (let item in acumulated) {
                  averages[item] = acumulated[item] / arr.length;
                }
                return averages;
              }
              return acumulated;
            });
          let dataArr = [];
          for (let item in averages) {
            dataArr.push({
              "Song property": item,
              Value: averages[item]
            });
          }
          setAnalysis(dataArr);
        });
    });
  }, []);

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const saveAsPlaylist = () => {
    const uris = tracks.map(item => item.uri);
    const date = new Date(Date.now()).toLocaleString().split(",")[0];
    const playListName = `Top Tracks ${date}`;
    let userId = "";

    spotifyApi.getMe().then(res => {
      userId = res.id;
      spotifyApi
        .createPlaylist(userId, {
          name: playListName
        })
        .then(res => {
          spotifyApi.addTracksToPlaylist(userId, res.id, uris);
        });
    });
  };

  return (
    <div className="top-tracks">
      <div className="top-tracks-header">
        <h1>Your top tracks:</h1>
        <div className="btn" onClick={saveAsPlaylist}>
          Save as playlist
        </div>
      </div>
      <div style={{display: "flex", justifyContent: 'center'}}>
        {showChart && (
          <Radar
            data={analysis}
            indexBy="Song property"
            keys={["Value"]}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            maxValue={1}
            width={700}
            height={500}
          />
        )}
      </div>
      <div className="d-flex justify-content-end">
        <FontAwesomeIcon style={{cursor: "pointer", fontSize: "2em"}} size="lg" onClick={toggleChart} icon="chart-line" />
      </div>
      <ul className="top-tracks-list">
        {tracks.map(trackData => (
          <Track
            key={trackData.id}
            image={trackData.album.images[2].url}
            artist={trackData.artists[0].name}
            title={trackData.name}
            length={trackData.duration_ms}
            trackId={trackData.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
