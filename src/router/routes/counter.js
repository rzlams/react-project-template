const counterRoutes = [
  {
    exact: true,
    path: '/',
    view: 'Counter',
    middlewares: ['alreadyLoggedIn'],
    permissions: ['counter.edit'],
  },
]

export default counterRoutes
