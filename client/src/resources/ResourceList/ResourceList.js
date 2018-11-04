import React, { Component } from "react";
import Resource from "./Resource";
import Search from "./Search";
import Sort from "./Sort";

class ResourceList extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    return { ...prevState, resources: nextProps.resources, filtered: nextProps.resources };
  }

  constructor (props) {
    super(props);
    this.state = { resources: [], searchTerm: "", sort: () => 0 };
  }

  handleSearch (searchTerm) {
    this.setState({ searchTerm });
  }

  handleSort (order) {
    this.setState({ order });
  }

  containsSearchTerm ({ name, description }) {
    return name.toLowerCase().indexOf(this.state.searchTerm) > -1
      || description.toLowerCase().indexOf(this.state.searchTerm) > -1;
  }

  render () {
    const filtered = this.state.resources
      .filter((res) => this.containsSearchTerm(res))
      .sort(this.state.order);
    return (
      <div>
        <div className="form-group">
          <div className="form-row">
            <div className="col-sm-6">
              <Search search={this.handleSearch.bind(this)}/>
            </div>
            <div className="col-sm-6">
              <Sort sort={this.handleSort.bind(this)}/>
            </div>
          </div>
        </div>
        {filtered.map((resource, index) => (
          <Resource key={index} resource={resource}/>
        ))}
      </div>
    );
  }
}

export default ResourceList;
