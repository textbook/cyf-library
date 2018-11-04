import React, { Component } from "react";

import ResourceList from "./ResourceList";
import ResourceService from "./ResourceService";

import "./Category.css";

export default class Category extends Component {
  service = new ResourceService()

  constructor (props) {
    super(props);
    this.state = { resources: [], category: props.match.params.category, loaded: false };
  }

  componentDidMount () {
    this.updateResources(this.state.category);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      const category = this.props.match.params.category;
      this.updateResources(category);
    }
  }

  showWarning () {
    return this.state.loaded && this.state.resources.length === 0;
  }

  updateResources (category) {
    this.service.getResourcesByCategory(category)
      .then((resources) => this.setState({ resources, category, loaded: true }));
  }

  render () {
    return (
      <div>
        <h2 data-qa="page-title">Category: {this.state.category}</h2>
        {this.showWarning()
          ? (
            <div className="alert alert-warning" role="alert" data-qa="no-resources-warning">
              No resources found for specified category.
            </div>
          )
          : <ResourceList resources={this.state.resources}/>
        }
      </div>
    );
  }
}
