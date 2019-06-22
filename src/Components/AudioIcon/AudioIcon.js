import React from "react";
import "./AudioIcon.scss";

const AudioIcon = ({ pause }) => {
  const paused = pause ? "noAnim" : "";
  return (
    <div className={`AudioIcon ${paused}`}>
      <div id="bar-1" className="bar" />
      <div id="bar-2" className="bar" />
      <div id="bar-3" className="bar" />
      <div id="bar-4" className="bar" />
      <div id="bar-5" className="bar" />
      <div id="bar-6" className="bar" />
    </div>
  );
};

export default AudioIcon;
