import React, { Component } from 'react'
import Resource from './Resource'
import Search from './Search'

class ResourceList extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    return { ...prevState, resources: nextProps.resources, filtered: nextProps.resources }
  }

  constructor (props) {
    super(props)
    this.state = { resources: [], filtered: [] }
  }

  handleSearch (searchTerm) {
    const term = searchTerm.toLowerCase()
    const filtered = this.state.resources.filter(res => this.containsTerm(res, term))
    this.setState({ filtered })
  }

  containsTerm ({ name, description }, searchTerm) {
    return name.toLowerCase().indexOf(searchTerm) > -1
      || description.toLowerCase().indexOf(searchTerm) > -1
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
