import React, { useEffect, useState } from "react";
import BarChart from "../BarChart/BarChart";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { spotifyApi } from "../../utils";

const TrackAnalysis = ({ match }) => {
  const [trackData, setTrackData] = useState({});
  const [trackAnalysis, setTrackAnalysis] = useState({});
  const [trackFeatures, setTrackFeatures] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    let tracksReady = false;
    let analysisReady = false;
    let featuresReady = false;
    function isLoadingFinished() {
      if (tracksReady && analysisReady && featuresReady) {
        setIsLoading(false)
      }
    }
    spotifyApi.getTrack(match.params.id).then(res => {
      setTrackData(res);
      console.log(res);
      tracksReady = true
      isLoadingFinished()
    });
    spotifyApi.getAudioAnalysisForTrack(match.params.id).then(res => {
      console.log(res);
      setTrackAnalysis(res);
      analysisReady = true;
      isLoadingFinished()
    });
    spotifyApi.getAudioFeaturesForTrack(match.params.id).then(res => {
      console.log(res);
      setTrackFeatures(res);
      featuresReady = true;
      isLoadingFinished()
    });
  }, []);

  const trackFeaturesChartData = songProperties.map(songProperty => {
    return {
      "Song Property": songProperty,
      Value: trackFeatures[songProperty]
    };
  });

  return (
    <div>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <h1>
            {trackData.artists[0].name} - {trackData.name}
          </h1>
          <div style={{ height: "500px" }}>
            <BarChart data={trackFeaturesChartData} keys={songProperties} />
          </div>
        </>
      )}
    </div>
  );
};

export default TrackAnalysis;
