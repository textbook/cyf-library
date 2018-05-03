import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'

describe('Search', () => {
  const searchTerm = 'whatever'

  let callback
  let wrapper

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<Search search={callback}/>)
    wrapper
      .find('[data-qa="search-input"]')
      .simulate('change', { target: { value: searchTerm } })
  })

  it('should call the handler with the search term when button clicked', () => {
    wrapper.find('[data-qa="search-button"]').simulate('click')

    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0]).toBe(searchTerm)
  })

  it('should call the handler with the search term when enter pressed', () => {
    wrapper.find('[data-qa="search-input"]').simulate('keypress', { key: 'Enter' })

    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0]).toBe(searchTerm)
  })

  it('should lowercase the search term', () => {
    wrapper
      .find('[data-qa="search-input"]')
      .simulate('change', { target: { value: 'HeLLo WorlD' } })
    wrapper.find('[data-qa="search-button"]').simulate('click')

    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0]).toBe('hello world')
  })
})
