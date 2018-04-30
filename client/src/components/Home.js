import React, { Component } from 'react'
import ResourceList from './ResourceList'
import ResourceService from '../services/ResourceService'

export default class Home extends Component {
  service = new ResourceService()

  constructor (props) {
    super(props)
    this.state = { resources: [] }
  }

  componentDidMount () {
    this.service.getResources().then(data => this.setState({ resources: data }))
  }

  render () {
    return <ResourceList resources={this.state.resources}/>
  }
}
