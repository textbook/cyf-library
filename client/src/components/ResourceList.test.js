import React from 'react'
import {shallow} from 'enzyme'
import ResourceList from './ResourceList'

describe('ResourceList', () => {
  const resources = [
    {name: 'React', description: 'Official React homepage', url: 'https://reactjs.org'},
    {name: 'Angular', description: 'Official Angular homepage', url: 'http://angular.io'},
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
    expect(wrapper.find('Resource').length).toEqual(2)
  })

  it('renders a search box', () => {
    expect(wrapper.find('Search').length).toEqual(1)
  })

  describe('when search performed', () => {
    beforeEach(() => {
      wrapper.find('Search').props().search('react')
    })

    it('should filter the resources', () => {
      wrapper.update()
      expect(wrapper.find('Resource').length).toEqual(1)
    })
  })
})
