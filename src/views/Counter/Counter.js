import React, { useContext } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Context } from '../../store'

const Counter = props => {
  const [{ counter }, dispatch] = useContext(Context)
  const { url } = useRouteMatch()

  return (
    <div>
      <h5>Count: {counter.count}</h5>
      <button onClick={() => dispatch({ type: 'COUNTER INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'COUNTER DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'COUNTER' })}>Reset</button>
      <br />
      <Link to={`${url}/fetch`}>Ir a Fetch</Link>
    </div>
  )
}

export default Counter
