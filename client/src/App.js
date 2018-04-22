import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Resource from './components/Resource'

class App extends Component {
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
      <div className="App">
        <Header/>
        <div className="resource-list">
        {this.state.resources.map((resource, index) => (
          <Resource key={index} resource={resource}/>
        ))}
        </div>
      </div>
    )
  }
}

export default App
