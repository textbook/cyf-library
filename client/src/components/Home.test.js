import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'
import ResourceService from '../services/ResourceService'

const mockGetResources = jest.fn()
jest.mock('../services/ResourceService', () => {
  return jest.fn().mockImplementation(() => {
    return { getResources: mockGetResources }
  })
})

describe('Home', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org' },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org' },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org' },
  ]

  let wrapper

  beforeEach(() => {
    ResourceService.mockClear()
    mockGetResources.mockClear()
    mockGetResources.mockReturnValueOnce(Promise.resolve(resources))

    wrapper = shallow(<Home/>)
  })


  it('requests resources from the service', () => {
    expect(mockGetResources).toBeCalledWith()
  })

  it('renders the resource list', () => {
    wrapper.update()
    expect(wrapper.find('ResourceList').props().resources).toEqual(resources)
  })
})
