import * as React from 'react'

import './app.css'

import { Child } from './child'
import { ChildUsual } from './child-usual'


export class App extends React.Component<{}, {}>{
  render() {
    console.log('app props:', this.props)
    console.log('app state:', this.state)
    return (
      <div>
        <div styleName="my-style">
          app text
        </div>
        <Child />
        <ChildUsual />
      </div>
    )
  }
}
