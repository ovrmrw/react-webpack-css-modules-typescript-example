import * as React from 'react'

// import './child.css'
const styles = require('./child.css')


export class ChildUsual extends React.Component<{}, {}>{
  render() {
    console.log('child-usual props:', this.props)
    console.log('child-usual state:', this.state)
    return (
      <div>
        <div className={styles['my-style']}>
          child-usual text
        </div>
      </div >
    )
  }
}
