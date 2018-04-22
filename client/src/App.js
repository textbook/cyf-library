import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'

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
        <ul>
          {this.state.resources.map((resource, index) => (
            <li key={index}>
              <a href={resource.url}>{resource.name}</a>
              <span> {resource.description}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
