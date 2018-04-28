import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => (
  <header className="navbar navbar-expand-sm navbar-light">
    <span className="navbar-brand">
      <Link to="/">
        <img src="cyf_logo.png" alt="Code Your Future logo"/>
      </Link>
    </span>

    <h1 className="navbar-text d-none d-sm-inline-block" data-qa="site-title">Resource library</h1>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-qa="nav-toggle">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" activeClassName="active" className="nav-link" data-qa="nav-link"
                   data-qa-value="home" exact={true}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" activeClassName="active" className="nav-link" data-qa="nav-link"
                   data-qa-value="about" exact={true}>About</NavLink>
        </li>
      </ul>
    </div>
  </header>
)

export default Header
