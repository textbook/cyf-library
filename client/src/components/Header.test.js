import React from 'react'
import { shallow } from 'enzyme'
import createRouterContext from 'react-router-test-context'
import Header from './Header'

describe('Header', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Header/>, { context: createRouterContext() })
  })

  it('shows the CYF logo', () => {
    expect(wrapper.find('img[src]').props().src).toEqual('cyf_logo.png')
  })

  it('shows the title', () => {
    expect(wrapper.find('h1').text().trim().toLowerCase())
        .toEqual('resource library')
  })

  it('shows a navigation bar', () => {
    const links = wrapper.find('NavLink')
    expect(links.get(0).props.to).toEqual('/')
    expect(links.get(0).props.children.trim()).toEqual('Home')
    expect(links.get(1).props.to).toEqual('/about')
    expect(links.get(1).props.children.trim()).toEqual('About')
  })
})
