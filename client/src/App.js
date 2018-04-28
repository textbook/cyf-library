import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import About from './components/About'
import ResourceList from './components/ResourceList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { resources: [] }
  }

  render () {
    return (
      <div className="App">
        <div>
          <Header/>

          <main className="container pt-5">
            <div className="col-md-8 offset-md-2">
              <Route exact path="/" component={ResourceList} />
              <Route exact path="/about" component={About} />
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App
