import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import ResourceList from './components/ResourceList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { resources: [] }
  }

  render () {
    return (
      <div className="App">
        <Header/>
        <main className="container pt-5">
          <div className="col-sm-8 offset-sm-2">
            <ResourceList/>
          </div>
        </main>
      </div>
    )
  }
}

export default App
