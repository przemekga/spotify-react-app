import React from "react";
import {spotifyApi} from '../../utils'


const Line = ({ name, image, genre, id }) => {
  const follow = id => {
    let artists = [];
    artists.push(id);
    spotifyApi.followArtists(artists).then(res => {
      console.log(res)
    }).catch(err => {
      console.log('err:', err)
    })
  };

  return (
    <div className="col-12">
      <div
        className="d-flex align-items-center"
        style={{
          borderBottom: "1px solid rgba(204, 204, 204, 0.39)",
          backgroundColor: "aliceblue"
        }}
      >
        <div style={{ width: "30px", height: "30px" }}>
          <img src={image} alt="" style={{ display: "block" }} />
        </div>
        <div style={{ padding: "0 20px" }}>{name}</div>
        <div
        style={{
          marginLeft: "auto",
          marginRight: "20px",
          textTransform: "uppercase",
          fontSize: ".65em"
        }}
        >
        {genre}
        </div>
        <i className="material-icons" onClick={() => follow(id)} title="Follow" style={{opacity: '.6', cursor: 'pointer'}}>library_add</i>
      </div>
    </div>
  );
};

export default Line;
