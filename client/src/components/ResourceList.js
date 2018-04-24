import React, { Component } from 'react'
import './ResourceList.css'
import Resource from './Resource'

class ResourceList extends Component {
  constructor (props) {
    super(props)
    this.state = { resources: [] }
  }

  componentDidMount () {
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ resources: data })
      })
  }

  render () {
    return (
      <div className="resource-list">
        {this.state.resources.map((resource, index) => (
          <Resource key={index} resource={resource}/>
        ))}
      </div>
    )
  }
}

export default ResourceList
