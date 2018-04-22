import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Header/>)
  })

  it('shows the CYF logo', () => {
    expect(wrapper.find('img[src]').props().src).toEqual('cyf_logo.png')
  })

  it('shows the title', () => {
    expect(wrapper.find('h1').text().trim().toLowerCase())
        .toEqual('resource library')
  })
})
