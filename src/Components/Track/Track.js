import React from "react";
import { Link } from "react-router-dom";

import "./Track.scss";

import { transformUnix } from "../../utils";

const Track = ({ image, artist, title, length, trackId }) => {
  length = transformUnix(length);
  return (
    <li className="TrackContainer">
      <Link className="Track" to={`/track/${trackId}`}>
        <div className="tmb">
          <img src={image} alt="" />
        </div>
        <div className="desc">
          <div>
            {artist} - {title}
          </div>
          <div className="lgt">{length}</div>
        </div>
      </Link>
    </li>
  );
};

export default Track;
