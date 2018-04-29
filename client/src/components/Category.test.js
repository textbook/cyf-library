import React from 'react'
import { shallow } from 'enzyme'
import Category from './Category'

describe('Category', () => {
  const resources = [
    { name: 'Some Title', description: 'A description', url: 'http://example.org', categories: ['html'] },
    { name: 'Other Title', description: 'Some other context text', url: 'http://example.org', categories: ['html'] },
    { name: 'Something Else', description: 'A different description', url: 'http://example.org', categories: ['html'] },
  ]

  let wrapper

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(resources))

    wrapper = shallow(<Category match={{ params: { category: 'html' } }}/>)
  })

  it('requests resources from the backend', () => {
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/api/resources?category=html')
  })

  it('renders the resource list', () => {
    wrapper.update()
    expect(wrapper.find('ResourceList').props().resources).toEqual(resources)
  })

  it('renders an appropriate header', () => {
    expect(wrapper.find('[data-qa="page-title"]').text().trim()).toEqual('Category: html')
  })

  it('updates the resources when the route changes', () => {
    fetch.resetMocks()
    fetch.mockResponseOnce('[]')

    wrapper.setProps({ match: { params: { category: 'javascript' } } })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/api/resources?category=javascript')
    expect(wrapper.find('[data-qa="page-title"]').text().trim()).toEqual('Category: javascript')
  })

  it('shows a warning when the resource list is empty', () => {
    wrapper.setState({ resources: [] })
    wrapper.update()

    expect(wrapper.find('[data-qa="no-resources-warning"]').text().trim())
      .toEqual('No resources found for specified category.')
  })
})
