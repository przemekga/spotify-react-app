import React from "react";
import Tag from "../Tag/Tag";

const PresentationHeader = ({
  image,
  name,
  followers,
  tags,
  secondLine = true
}) => {
  return (
    <div className="col-12">
      <div className="artist-header">
        <img src={image} alt="" />
        <h4>{name}</h4>
      </div>
      {secondLine && (
        <div className="d-flex align-items-center">
          <p className="mr-4">Followers: {followers}</p>
          <div>
            {tags.map((item, index) => (
              <Tag name={item} key={index} limit={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentationHeader;
