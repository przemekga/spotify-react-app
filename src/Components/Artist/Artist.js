import React from "react";
import Tag from "../Tag/Tag";
import { Link } from "react-router-dom";

import "./Artist.scss";

const Artist = ({ image, name, col, tags, followers, id }) => {
  if (tags.length > 5) {
    tags.length = 4;
  }

  tags = tags.map((item, index) => <Tag name={item} key={index} />);

  return (
    <li className={`d-flex flex-column col-12 col-sm-6 col-md-${col}`}>
      <Link to={`/artist/${id}`} className="artist">
        <div className="row">
          <div className="col-6">
            <div className="card-image">
              <img src={image} alt={name} />
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
      </Link>
    </li>
  );
};

export default Artist;
