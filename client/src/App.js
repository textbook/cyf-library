import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import About from './components/About'
import Category from './components/Category'
import Header from './components/Header'
import Home from './components/Home'

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
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/category/:category" component={Category} />
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App
