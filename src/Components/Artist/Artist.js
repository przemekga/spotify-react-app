import React, { useState } from "react";
import Tag from "../Tag/Tag";
import RelatedArtists from "../RelatedArtist/List";

import "./Artist.scss";

const Artist = ({ image, name, col, tags, followers, id }) => {
  const [relatedArtistShown, setRelatedArtistShown] = useState(false);

  if (tags.length > 5) {
    tags.length = 4;
  }

  tags = tags.map((item, index) => <Tag name={item} key={index} />);

  return (
    <li className={`d-flex flex-column col-12 col-sm-6 col-md-${col}`}>
      <div className="artist">
        <div className="row">
          <div className="col-6">
            <div className="card-image">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-6">
            <div className="card-desc">
              <h1>{name}</h1>
              <p>Followers: {followers}</p>
              <div style={{ margin: "0 -4px" }}>{tags}</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Artist;
