import React, { Component } from "react";

export default class Search extends Component {
  buttonClicked () {
    this.performSearch();
  }

  inputChanged (event) {
    this.setState({ searchTerm: event.target.value });
  }

  keyPressed (event) {
    if (event.key === "Enter") {
      this.performSearch();
    }
  }

  performSearch () {
    this.props.search(this.state.searchTerm.toLowerCase());
  }

  render () {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Enter keywords" aria-label="Search"
          data-qa="search-input" onChange={this.inputChanged.bind(this)} onKeyPress={this.keyPressed.bind(this)}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" data-qa="search-button"
            onClick={this.buttonClicked.bind(this)}>Search
          </button>
        </div>
      </div>
    );
  }
}
