import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import middlewares from './middlewares'
import { Context } from '../store'

const RouteWrapper = ({ mwares, permissions, ...rest }) => {
  const [{ auth }] = useContext(Context)
  const extras = { permissions, auth }

  const resolveMiddlewares = () => {
    let result = { next: true, component: null, redirectPath: null }
    if (mwares && mwares.length > 0) {
      mwares.forEach(mware => {
        if (result.next) {
          result = middlewares[mware] && middlewares[mware]({ ...rest }, { ...extras })
        }
      })
    } else {
      result = { ...result, ...rest }
    }

    if (permissions && permissions.length > 0) {
      result = middlewares.checkPermissions({ ...rest }, { ...extras })
    }

    return result
  }

  const render = () => {
    const routeProps = resolveMiddlewares()
    const { component, redirectPath } = routeProps

    return component !== null && redirectPath === null ? <Route {...routeProps} /> : <Redirect to={redirectPath} />
  }

  return render()
}

export default RouteWrapper
