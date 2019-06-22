import React from 'react'
import {Link} from 'react-router-dom'
import './AlbumCard.scss'

const AlbumCard = ({data}) => {
  return (
    <Link to={`/album/${data.id}`} className="AlbumCard">
      <div className="album-img">
        <img src={data.images[1].url} alt=""/>
        <p>{data.name}</p>
      </div>
    </Link>
  )
}

export default AlbumCard
