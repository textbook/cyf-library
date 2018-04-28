import React, { Component } from 'react'
import './ResourceList.css'
import Resource from './Resource'
import Search from './Search'

class ResourceList extends Component {
  constructor (props) {
    super(props)
    this.state = { resources: [], filtered: [] }
  }

  componentDidMount () {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => this.setState({ resources: data, filtered: data }))
  }

  handleSearch (searchTerm) {
    const term = searchTerm.toLowerCase()
    const filtered = this.state.resources.filter(res => this.containsTerm(res, term))
    this.setState({ filtered })
  }

  containsTerm ({ name }, searchTerm) {
    return name.toLowerCase().indexOf(searchTerm) > -1
  }

  render () {
    return (
      <div>
        <div className="form-group">
          <Search search={this.handleSearch.bind(this)}/>
        </div>
        {this.state.filtered.map((resource, index) => (
          <Resource key={index} resource={resource}/>
        ))}
      </div>
    )
  }
}

export default ResourceList
