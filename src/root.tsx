import * as React from 'react'

import { App } from './app'


export class Root extends React.Component<{}, {}>{
  render() {
    return (
      <div>
        <div className="my-style">
          root text
        </div>
        <App />
      </div>
    )
  }
}
