import React from 'react'
import './Resource.css'

const Resource = (props) => {
  const { name, url, description } = props.resource
  return (
    <div className="card" data-qa="resource">
      <div className="card-body">
        <h3 className="card-title"  data-qa="resource-name">{name}</h3>
        <p className="card-text" data-qa="resource-description">{description}</p>
        <a className="card-link" href={url} data-qa="resource-link">View</a>
      </div>
    </div>
  )
}

export default Resource
