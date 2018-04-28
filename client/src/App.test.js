import React from 'react'
import { shallow } from 'enzyme'
import createRouterContext from 'react-router-test-context'
import App from './App'
import ResourceList from './components/ResourceList'
import About from './components/About'

describe('App', () => {
  const resources = [
    { name: 'React', description: 'Official React homepage', url: 'https://reactjs.org' },
    { name: 'Angular', description: 'Official Angular homepage', url: 'http://angular.io' },
  ]

  let wrapper

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(resources))

    wrapper = shallow(<App/>, { context: createRouterContext() })
  })

  it('renders the routes', () => {
    const routes = wrapper.find('Route')
    expect(routes.length).toBe(2)
    expect(routes.get(0).props.path).toBe('/')
    expect(routes.get(0).props.component).toBe(ResourceList)
    expect(routes.get(1).props.path).toBe('/about')
    expect(routes.get(1).props.component).toBe(About)
  })
})
