import React from 'react'
import './Resource.css'

const Resource = (props) => {
  const { name, url, description } = props.resource;
  return (
      <div className="resource">
        <h3 className="resource-name">{name}</h3>
        <span className="resource-description">{description}</span>
        <a className="resource-link" href={url}>View</a>
      </div>
  )
}

export default Resource
