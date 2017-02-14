import * as React from 'react'

import './child.css'


export class Child extends React.Component<{}, {}> {
  render() {
    console.log('child props:', this.props) // {} (empty object)
    console.log('child state:', this.state) // null
    return (
      <div>
        <div id="child-text" styleName="my-style">
          child text
        </div>
      </div >
    )
  }
}
