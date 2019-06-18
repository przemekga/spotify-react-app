import React, { useEffect, useState } from "react";

import { spotifyApi } from "../../utils";

const TrackAnalysis = ({ trackId }) => {
  useEffect(() => {
    spotifyApi.getAudioAnalysisForTrack(trackId).then(res => {
      console.log(res);
    });
  });
  return <div>analysis</div>;
};

export default TrackAnalysis;
