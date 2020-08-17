import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Counter from '../../views/Counter'

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={Counter} />
    </Switch>
  )
}

export default Routes
