import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

const Fetch = props => {
  const { loading, error, data, refetch } = useFetch('https://reqres.in/api/users', { page: 2 })
  const { url } = useRouteMatch()

  if (loading) return null // o un spinner
  if (error) return `Error! ${error}`

  return (
    <div>
      <hr />
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
      <button onClick={() => refetch()}>Refetch</button>
      <hr />
    </div>
  )
}

export default Fetch
