import { shallow } from 'enzyme'
import Deferred from 'promise-deferred'
import React from 'react'

import Category from './Category'
import ResourceService, { mockGetResourcesByCategory } from './ResourceService'

jest.mock('./ResourceService')

describe('Category', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org', categories: ['html'] },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org', categories: ['html'] },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org', categories: ['html'] },
  ]

  let wrapper
  let deferred

  beforeEach(async () => {
    deferred = new Deferred()
    ResourceService.mockClear()
    mockGetResourcesByCategory.mockClear()
    mockGetResourcesByCategory.mockReturnValue(deferred.promise)

    wrapper = await shallow(<Category match={{ params: { category: 'html' } }}/>)
  })

  it('requests resources from the service', () => {
    expect(mockGetResourcesByCategory).toBeCalledWith('html')
  })

  it('renders the resource list', done => {
    deferred.resolve(resources)

    assertLater(() => {
      wrapper.update()
      expect(wrapper.find('ResourceList').props().resources).toEqual(resources)
    }, done)
  })

  it('renders an appropriate header', () => {
    expect(wrapper.find('[data-qa="page-title"]').text().trim()).toEqual('Category: html')
  })

  it('updates the resources when the route changes', done => {
    wrapper.setProps({ match: { params: { category: 'javascript' } } })
    deferred.resolve([])

    assertLater(() => {
      wrapper.update()
      expect(mockGetResourcesByCategory).toBeCalledWith('javascript')
      expect(wrapper.find('[data-qa="page-title"]').text().trim()).toEqual('Category: javascript')
    }, done)
  })

  it('shows a warning when the resource list is empty', done => {
    deferred.resolve([])

    assertLater(() => {
      wrapper.update()
      expect(wrapper.find('[data-qa="no-resources-warning"]').text().trim())
        .toEqual('No resources found for specified category.')
    }, done)
  })

  it('does not show a warning before the page has finished loading', () => {
    expect(wrapper.find('[data-qa="no-resources-warning"]').length).toEqual(0)
  })
})
