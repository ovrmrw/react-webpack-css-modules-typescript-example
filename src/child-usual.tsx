import * as React from 'react'

// import './child.css'
import * as styles from './child.css'


export class ChildUsual extends React.Component<{}, {}> {
  render() {
    console.log('child-usual props:', this.props) // {} (empty object)
    console.log('child-usual state:', this.state) // null
    return (
      <div>
        <div id="child-usual-text" className={styles['my-style']}>
          child-usual text
        </div>
      </div >
    )
  }
}
