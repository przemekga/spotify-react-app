import React from "react";
import "./Track.scss";

import { transformUnix } from "../../utils";

const Track = ({ image, artist, title, length }) => {
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
    </li>
  );
};

export default Track;
