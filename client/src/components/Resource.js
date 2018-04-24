import React from 'react'
import './Resource.css'

const Resource = (props) => {
  const { name, url, description } = props.resource
  return (
    <div className="resource card">
      <div className="card-body">
        <h3 className="resource-name card-title">{name}</h3>
        <p className="resource-description card-text">{description}</p>
        <a className="resource-link card-link" href={url}>View</a>
      </div>
    </div>
  )
}

export default Resource
