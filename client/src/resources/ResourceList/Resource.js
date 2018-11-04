import React from "react";
import { Link } from "react-router-dom";
import "./Resource.css";

const Resource = (props) => {
  const { name, url, description, categories } = props.resource;
  return (
    <div className="card" data-qa="resource">
      <div className="card-body">
        <h3 className="card-title" data-qa="resource-name">{name}</h3>
        <p className="card-text" data-qa="resource-description">{description}</p>
        <div className="d-flex justify-content-between">
          <a className="card-link" href={url} data-qa="resource-link">View</a>
          <div>
            {categories.map((category, index) => (
              <Link to={`/category/${category}`} className="badge badge-info" key={index} data-qa="resource-category"
                data-qa-value={category}>
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
