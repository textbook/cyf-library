import React, { Component } from 'react'
import ResourceList from './ResourceList'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { resources: [] }
  }

  componentDidMount () {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => this.setState({ resources: data }))
  }

  render () {
    return <ResourceList resources={this.state.resources}/>
  }
}
