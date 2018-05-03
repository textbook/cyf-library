import React, { Component } from 'react'

export default class Sort extends Component {
  static sortFunctions = {
    0: (r1, r2) => r2.created - r1.created,
    1: (r1, r2) => r2.name === r1.name ? 0 : (r2.name > r1.name ? -1 : 1),
  }

  selectChanged (event) {
    this.props.sort(Sort.sortFunctions[event.target.value])
  }

  render () {
    return (
      <div className="input-group">
        <select className="custom-select" data-qa="sort-select" onChange={this.selectChanged.bind(this)}>
          <option value={0}>Sort by date</option>
          <option value={1}>Sort by name</option>
        </select>
      </div>
    )
  }
}
