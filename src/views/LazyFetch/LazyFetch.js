import React from 'react'
import { Link } from 'react-router-dom'

const LazyFetch = props => {
  return (
    <div>
      <h5>Lazy Fetch</h5>
      <Link to={'/fetch'}>Ir a Fetch</Link>
      <br />
      <Link to={'/'}>Ir a Counter</Link>
    </div>
  )
}

export default LazyFetch
