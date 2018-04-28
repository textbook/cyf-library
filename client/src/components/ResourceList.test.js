import React from 'react'
import {shallow} from 'enzyme'
import ResourceList from './ResourceList'

describe('ResourceList', () => {
  const resources = [
    {name: 'Some Title', description: 'A description', url: 'http://example.org'},
    {name: 'Other Title', description: 'Some other context text', url: 'http://example.org'},
    {name: 'Something Else', description: 'A different description', url: 'http://example.org'},
  ]

  let wrapper

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(resources))

    wrapper = shallow(<ResourceList/>)
  })

  it('requests resources from the backend', () => {
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/api/resources')
  })

  it('renders the resources', () => {
    wrapper.update()
    expect(wrapper.find('Resource').length).toEqual(resources.length)
  })

  it('renders a search box', () => {
    expect(wrapper.find('Search').length).toEqual(1)
  })

  describe('when search performed', () => {
    it('should filter the resources by title', () => {
      wrapper.find('Search').props().search('title')
      wrapper.update()
      expect(wrapper.find('Resource').length).toEqual(2)
    })

    it('should filter the resources by description', () => {
      wrapper.find('Search').props().search('description')
      wrapper.update()
      expect(wrapper.find('Resource').length).toEqual(2)
    })
  })
})
