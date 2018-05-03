import { shallow } from 'enzyme'
import Deferred from 'promise-deferred'
import React from 'react'

import Home from './Home'
import ResourceService, { mockGetResources } from '../services/ResourceService'

jest.mock('../services/ResourceService')

describe('Home', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org' },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org' },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org' },
  ]

  let wrapper
  let deferred

  beforeEach(() => {
    deferred = new Deferred()
    ResourceService.mockClear()
    mockGetResources.mockClear()
    mockGetResources.mockReturnValueOnce(deferred.promise)

    wrapper = shallow(<Home/>)
  })


  it('requests resources from the service', () => {
    expect(mockGetResources).toBeCalledWith()
  })

  it('renders the resource list', done => {
    deferred.resolve(resources)

    assertLater(() => {
      wrapper.update()
      expect(wrapper.find('ResourceList').props().resources).toEqual(resources)
    }, done)
  })
})
