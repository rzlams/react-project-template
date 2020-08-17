import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RouteWrapper from './RouteWrapper'
import routes from './routes'

import Counter from '../views/Counter'
import Fetch from '../views/Fetch'
import LazyFetch from '../views/LazyFetch'
import NotFound from '../views/NotFound'

const views = {
  Counter,
  Fetch,
  LazyFetch,
}

const Router = () => (
  <Switch>
    {routes.map((route, i) => (
      <RouteWrapper key={i} component={views[route.view]} mwares={route.middlewares} {...route} />
    ))}
    <Route path={'*'} component={NotFound} />
  </Switch>
)

export default Router
