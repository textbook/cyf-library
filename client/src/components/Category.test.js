import React from 'react'
import { shallow } from 'enzyme'
import Category from './Category'
import ResourceService from '../services/ResourceService'

const mockGetResourcesByCategory = jest.fn()
jest.mock('../services/ResourceService', () => {
  return jest.fn().mockImplementation(() => {
    return { getResourcesByCategory: mockGetResourcesByCategory }
  })
})

describe('Category', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org', categories: ['html'] },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org', categories: ['html'] },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org', categories: ['html'] },
  ]

  let wrapper

  beforeEach(() => {
    ResourceService.mockClear()
    mockGetResourcesByCategory.mockClear()
    mockGetResourcesByCategory.mockReturnValueOnce(Promise.resolve(resources))

    wrapper = shallow(<Category match={{ params: { category: 'html' } }}/>)
  })

  it('requests resources from the service', () => {
    expect(mockGetResourcesByCategory).toBeCalledWith('html')
  })

  it('renders the resource list', () => {
    wrapper.update()
    expect(wrapper.find('ResourceList').props().resources).toEqual(resources)
  })

  it('renders an appropriate header', () => {
    expect(wrapper.find('[data-qa="page-title"]').text().trim()).toEqual('Category: html')
  })

  it('updates the resources when the route changes', () => {
    mockGetResourcesByCategory.mockReturnValueOnce(Promise.resolve([]))

    wrapper.setProps({ match: { params: { category: 'javascript' } } })

    expect(mockGetResourcesByCategory).toBeCalledWith('javascript')
    expect(wrapper.find('[data-qa="page-title"]').text().trim()).toEqual('Category: javascript')
  })

  it('shows a warning when the resource list is empty', () => {
    wrapper.setState({ resources: [] })
    wrapper.update()

    expect(wrapper.find('[data-qa="no-resources-warning"]').text().trim())
      .toEqual('No resources found for specified category.')
  })
})
