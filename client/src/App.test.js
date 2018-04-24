import React from 'react'
import {shallow} from 'enzyme'
import App from './App'

describe('App', () => {
  const resources = [
    {name: 'React', description: 'Official React homepage', url: 'https://reactjs.org'},
    {name: 'Angular', description: 'Official Angular homepage', url: 'http://angular.io'},
  ]

  let wrapper

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(resources))

    wrapper = shallow(<App/>)
  })

  it('renders the header', () => {
    expect(wrapper.find('Header').length).toBe(1)
  })

  it('renders the resource list', () => {
    expect(wrapper.find('ResourceList').length).toBe(1)
  })
})
