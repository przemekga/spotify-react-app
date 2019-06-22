import React from 'react'
import './AlbumCard.scss'

const AlbumCard = ({data}) => {
  return (
    <div className="AlbumCard">
      <div className="album-img">
        <img src={data.images[1].url} alt=""/>
        <p>{data.name}</p>
      </div>
    </div>
  )
}

export default AlbumCard
