import React from 'react'

const AlbumCard = ({data}) => {
  return (
    <div>
      <div className="album-img">
        <img src={data.images[1].url} alt=""/>
        <p>{data.name}</p>
      </div>
    </div>
  )
}

export default AlbumCard
