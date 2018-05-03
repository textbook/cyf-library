import React from 'react'
import { shallow } from 'enzyme'
import Sort from './Sort'

describe('Sort', () => {
  let callback
  let wrapper

  const olderResource = { created: new Date(12345) }
  const newerResource = { created: new Date(23456) }

  const aTitleResource = { name: 'A is for apple' }
  const zTitleResource = { name: 'Z is for zebra' }

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(<Sort sort={callback}/>)
  })

  it('should provide two options', () => {
    const expectedOptions = ['Sort by date', 'Sort by name']
    wrapper.find('option').forEach((element, index) => {
      expect(element.text().trim()).toEqual(expectedOptions[index])
    })
  })

  describe('when name option selected', () => {
    beforeEach(() => {
      wrapper
        .find('[data-qa="sort-select"]')
        .simulate('change', { target: { value: 1 } })
    })

    it('should call the handler with the sort function', () => {
      expect(callback.mock.calls.length).toBe(1)
      const sortFunction = callback.mock.calls[0][0]
      expect(sortFunction(aTitleResource, zTitleResource)).toBeLessThan(0)
      expect(sortFunction(aTitleResource, aTitleResource)).toEqual(0)
      expect(sortFunction(zTitleResource, aTitleResource)).toBeGreaterThan(0)
    })
  })

  describe('when date option selected', () => {
    beforeEach(() => {
      wrapper
        .find('[data-qa="sort-select"]')
        .simulate('change', { target: { value: 0 } })
    })

    it('should call the handler with the sort function', () => {
      expect(callback.mock.calls.length).toBe(1)
      const sortFunction = callback.mock.calls[0][0]

      expect(sortFunction(newerResource, olderResource)).toBeLessThan(0)
      expect(sortFunction(olderResource, olderResource)).toEqual(0)
      expect(sortFunction(olderResource, newerResource)).toBeGreaterThan(0)
    })
  })
})
