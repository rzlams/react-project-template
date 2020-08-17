import fetchRoutes from './fetch'
import counterRoutes from './counter'

const routesArray = [counterRoutes, fetchRoutes]

let routes = []

routesArray.forEach(route => {
  route.forEach(r => {
    routes.push(r)
  })
})

export default routes
