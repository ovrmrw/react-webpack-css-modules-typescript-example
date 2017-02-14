import * as React from 'react'
import * as CSSModules from 'react-css-modules'
import { shallow, ShallowWrapper } from 'enzyme'

import { App } from '../app'
import { Child } from '../child'
import { ChildUsual } from '../child-usual'

import * as appStyles from '../app.css'
import * as childStyles from '../child.css'


test('App can initialize', () => {
  const wrapper = shallow(React.createElement(App))
  expect(wrapper.length).toBe(1)
})

test('App text has class', () => {
  const wrapper = shallowCSSModulesRenderer(App, appStyles)
  expect(wrapper.find('#app-text').hasClass('my-style')).toBe(true)
})

test('Child can initialize', () => {
  const wrapper = shallow(React.createElement(Child))
  expect(wrapper.length).toBe(1)
})

test('Child text has class', () => {
  const wrapper = shallowCSSModulesRenderer(Child, childStyles)
  expect(wrapper.find('#child-text').hasClass('my-style')).toBe(true)
})

test('ChildUsual can initialize', () => {
  const wrapper = shallow(React.createElement(ChildUsual))
  expect(wrapper.length).toBe(1)
})

test('ChildUsual text has class', () => {
  const wrapper = shallowCSSModulesRenderer(ChildUsual)
  expect(wrapper.find('#child-usual-text').hasClass('my-style')).toBe(true)
})



function shallowCSSModulesRenderer<T, U>(component: any, styles?: any): ShallowWrapper<T, U> {
  if (styles) {
    return shallow(React.createElement(CSSModules(component, styles))) as any
  } else {
    return shallow(React.createElement(component)) as any
  }
}
