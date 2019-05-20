import React from 'react'
import './Track.scss'

const Track = ({image, artist, title, length}) => {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  length = millisToMinutesAndSeconds(length);
  return (
    <li className="Track">
      <div className="tmb"><img src={image} alt=""/></div>
      <div className="desc">
        <div>{artist} - {title}</div>
        <div className="lgt">{length}</div>
      </div>
    </li>
  )
}

export default Track
