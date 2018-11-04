import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { MarkGithubIcon } from "react-octicons";

import "./Resource.css";

const Resource = (props) => {
  const {
    categories,
    created,
    creator,
    description,
    name,
    url,
  } = props.resource;
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
        <a className="card-link" href={url} data-qa="resource-link">
          View
        </a>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <a
          className="d-flex badge badge-light align-items-center"
          href={`https://github.com/${creator}`}
          data-qa="resource-creator"
        >
          <MarkGithubIcon />
          <span>{creator}</span>
        </a>
        <div className="d-flex align-items-center">
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
  );
};

export default Resource;
