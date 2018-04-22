import React from 'react'
import './Resource.css'

const Resource = (props) => {
  const { name, url, description } = props.resource;
  return (
      <div className="resource">
        <h3><a className="resource-name" href={url}>{name}</a></h3>
        <span className="resource-description">{description}</span>
      </div>
  )
}

export default Resource
