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

  it('renders the title', () => {
    expect(wrapper.find('h1').text().trim().toLowerCase())
        .toEqual('resource library')
  })

  it('requests resources from the backend', () => {
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/api/resources')
  })

  it('renders the resources', () => {
    wrapper.update()
    expect(wrapper.find('li').length).toEqual(2)
    const firstElement = wrapper.find('li').first()
    const firstResource = resources[0]
    expect(firstElement.find('[href]').props().href).toEqual(firstResource.url)
    expect(firstElement.text()).toContain(firstResource.name)
    expect(firstElement.text()).toContain(firstResource.description)
  })
})
