import React from "react";
import TrackAnalysis from "../TrackAnalysis/TrackAnalysis";

import "./Track.scss";

import { transformUnix } from "../../utils";

const Track = ({ image, artist, title, length, trackId }) => {
  length = transformUnix(length);
  return (
    <li className="Track">
      <div className="tmb">
        <img src={image} alt="" />
      </div>
      <div className="desc">
        <div>
          {artist} - {title}
        </div>
        <div className="lgt">{length}</div>
      </div>
      <TrackAnalysis trackId={trackId} />
    </li>
  );
};

export default Track;
