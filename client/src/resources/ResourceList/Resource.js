import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./Resource.css";

const Resource = (props) => {
  const { name, url, description, categories, created } = props.resource;
  return (
    <div className="card" data-qa="resource">
      <div className="card-body">
        <div className="card-title d-flex justify-content-between align-items-start">
          <h3 data-qa="resource-name">{name}</h3>
          <small data-qa="resource-created">
            Added {moment(created).fromNow()}
          </small>
        </div>
        <p className="card-text" data-qa="resource-description">
          {description}
        </p>
        <div className="d-flex justify-content-between">
          <a className="card-link" href={url} data-qa="resource-link">
            View
          </a>
          <div>
            {categories.map((category, index) => (
              <Link
                to={`/category/${category}`}
                className="badge badge-info"
                key={index}
                data-qa="resource-category"
                data-qa-value={category}
              >
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
