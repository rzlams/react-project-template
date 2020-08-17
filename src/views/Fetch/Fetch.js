import React from 'react'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

const Fetch = props => {
  const { loading, error, data, refetch } = useFetch('https://reqres.in/api/users', { page: 2 })
  const { url } = useRouteMatch()
  const { state: routeState } = useLocation()

  if (loading) return <h1>Loading...</h1>
  if (error) return `Error! ${error}`

  return (
    <div>
      {/* mostrar con un componente que aparezca como el 'message' de ant design*/ routeState && routeState.redirectReason}
      <br />
      <br />
      <hr />
      <button onClick={() => refetch()}>Refetch</button>
      <hr />
      <br />
      <br />
      <Link to={`${url}/lazy`}>Ir a LazyFetch</Link>
      <br />
      <Link to={'/'}>Ir a Counter</Link>
      {data &&
        data.data.map(user => (
          <h5 key={user.id}>
            <img src={user.avatar} alt={'avatar'} />
            {user.first_name} {user.last_name}
          </h5>
        ))}
    </div>
  )
}

export default Fetch
