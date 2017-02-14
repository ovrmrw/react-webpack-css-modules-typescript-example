import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { App } from '../app'
import { Child } from '../child'
import { ChildUsual } from '../child-usual'


test('App can initialize', () => {
  const wrapper = shallow(React.createElement(App))
  expect(wrapper.length).toBe(1)
})

test('Child can initialize', () => {
  const wrapper = shallow(React.createElement(Child))
  expect(wrapper.length).toBe(1)
})

test('ChildUsual can initialize', () => {
  const wrapper = shallow(React.createElement(ChildUsual))
  expect(wrapper.length).toBe(1)
})
