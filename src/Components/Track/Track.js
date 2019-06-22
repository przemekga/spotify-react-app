import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css';

import "./Track.scss";

import { transformUnix } from "../../utils";

const Track = ({ image, artist, title, length, trackId, popularity, showName = true }) => {
  length = transformUnix(length);
  const barMaxWidth = 280;
  const popularityPercentage = popularity / barMaxWidth * 100;

  const tooltipRef = React.createRef();
  
  useEffect(() => {
    M.Tooltip.init(tooltipRef.current);
  }, [])

  return (
    <li className="TrackContainer">
      <Link className="Track" to={`/track/${trackId}`}>
        <div className="tmb">
          <img src={image} alt="" />
        </div> 
        <div className="desc">
          <div className="trackSongTitle">
            {showName && `${artist} -`} {title}
          </div>
          <div className="popularity" style={{width: `${barMaxWidth}px`}}>
            <div data-tooltip={`Popularity: ${popularity}`}  ref={tooltipRef} data-position="bottom" className="tooltipped bar" style={{width: `${popularityPercentage}%`}}></div>
          </div>
          <div className="lgt">{length}</div>
        </div>
      </Link>
    </li>
  );
};

export default Track;
