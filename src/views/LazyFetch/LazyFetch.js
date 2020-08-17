import React from 'react'
import { Link } from 'react-router-dom'
import { useLazyFetch } from '../../hooks/useLazyFetch'

const LazyFetch = props => {
  const [myQuery, { loading, error, data }] = useLazyFetch('https://reqres.in/api/users')

  if (loading) return <h1>Loading...</h1>
  if (error) return `Error! ${error}`

  return (
    <div>
      <h5>Lazy Fetch</h5>
      <Link to={'/fetch'}>Ir a Fetch</Link>
      <br />
      <Link to={'/'}>Ir a Counter</Link>
      <br />
      <br />
      <button onClick={() => myQuery({ page: 1 })}>Fetch con useLazy</button>
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

export default LazyFetch
