import React from 'react'
import './Header.css'

const Header = () => (
  <header className="navbar navbar-light justify-content-start">
    <span className="navbar-brand">
      <img src="cyf_logo.png" alt="Code Your Future logo"/>
    </span>
    <h1 className="page-title navbar-text d-none d-sm-block" data-qa="page-title">Resource library</h1>
  </header>
)

export default Header
