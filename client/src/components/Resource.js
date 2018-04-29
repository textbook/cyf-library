import React from 'react'
import './Resource.css'

const Resource = (props) => {
  const { name, url, description, categories } = props.resource
  return (
    <div className="card" data-qa="resource">
      <div className="card-body">
        <h3 className="card-title"  data-qa="resource-name">{name}</h3>
        <p className="card-text" data-qa="resource-description">{description}</p>
        <div className="d-flex justify-content-between">
          <a className="card-link" href={url} data-qa="resource-link">View</a>
          <div>
            {categories.map((category, index) => (
              <span className="badge badge-info" key={index} data-qa="resource-category">{category}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resource
