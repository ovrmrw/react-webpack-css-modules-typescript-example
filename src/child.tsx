import * as React from 'react'

import './child.css'


export class Child extends React.Component<{}, {}>{
  render() {
    console.log('child props:', this.props)
    console.log('child state:', this.state)
    return (
      <div>
        <div styleName="my-style">
          child text
        </div>
      </div >
    )
  }
}
