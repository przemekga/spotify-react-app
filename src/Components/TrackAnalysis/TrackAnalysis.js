import React, { useEffect, useState } from "react";
import BarChart from "../BarChart/BarChart";
import { spotifyApi } from "../../utils";

const TrackAnalysis = ({ match }) => {
  const [trackData, setTrackData] = useState({});
  const [trackAnalysis, setTrackAnalysis] = useState({});
  const [trackFeatures, setTrackFeatures] = useState({});

  const songProperties = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    // "loudness",
    "speechiness",
    "valence"
  ];

  useEffect(() => {
    spotifyApi.getTrack(match.params.id).then(res => {
      setTrackData(res);
      console.log(res);
    });
    spotifyApi.getAudioAnalysisForTrack(match.params.id).then(res => {
      console.log(res);
      setTrackAnalysis(res);
    });
    spotifyApi.getAudioFeaturesForTrack(match.params.id).then(res => {
      console.log(res);
      setTrackFeatures(res);
    });
  }, []);

  const trackFeaturesChartData = songProperties.map(songProperty => {
    return {
      "Song Property": songProperty,
      Value: trackFeatures[songProperty]
    };
  });
  console.log(JSON.stringify(trackFeaturesChartData));
  console.log(trackFeaturesChartData);

  return (
    <div>
      <div style={{ height: "500px" }}>
        <BarChart data={trackFeaturesChartData} keys={songProperties}/>
      </div>
    </div>
  );
};

export default TrackAnalysis;
