import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'

describe('Home', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org' },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org' },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org' },
  ]

  let wrapper

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(resources))

    wrapper = shallow(<Home/>)
  })

  it('requests resources from the backend', () => {
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/api/resources')
  })

  it('renders the resource list', () => {
    wrapper.update()
    expect(wrapper.find('ResourceList').props().resources).toEqual(resources)
  })
})
