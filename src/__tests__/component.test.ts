import * as React from 'react'
import * as CSSModules from 'react-css-modules'
import { shallow, ShallowWrapper } from 'enzyme'

import { App } from '../app'
import { Child } from '../child'
import { ChildUsual } from '../child-usual'

import * as dummyStyles from './dummy.css'


test('App can initialize', () => {
  const wrapper = shallow(React.createElement(App))
  expect(wrapper.length).toBe(1)
})

test('App text has class', () => {
  const wrapper = shallow(decoratedElement(App))
  expect(wrapper.find('#app-text').hasClass('my-style')).toBe(true)
})

test('Child can initialize', () => {
  const wrapper = shallow(React.createElement(Child))
  expect(wrapper.length).toBe(1)
})

test('Child text has class', () => {
  const wrapper = shallow(decoratedElement(Child))
  expect(wrapper.find('#child-text').hasClass('my-style')).toBe(true)
})

test('ChildUsual can initialize', () => {
  const wrapper = shallow(React.createElement(ChildUsual))
  expect(wrapper.length).toBe(1)
})

test('ChildUsual text has class', () => {
  const wrapper = shallow(decoratedElement(ChildUsual))
  expect(wrapper.find('#child-usual-text').hasClass('my-style')).toBe(true)
})



function decoratedElement(component: typeof React.Component): React.ComponentElement<any, any> {
  return React.createElement(CSSModules(component, dummyStyles, { allowMultiple: true }))
}
