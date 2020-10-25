import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLazyFetch } from '../../hooks/useLazyFetch'
import { Context, useStore } from '../../store'
import { useValidation } from '../../hooks/useValidation'
import { initialValues, validation } from './validation'

const LazyFetch = props => {
  const [{ users, ...state }, dispatch] = useContext(Context)
  const { hasPermissions } = useStore({...state})
  const [myQuery, { loading, error}] = useLazyFetch('https://reqres.in/api/users', onCompleted)

  const [validate, ErrorComponent, submitHandler] = useValidation(initialValues, validation)
  const [formData, setFormData] = useState(initialValues)

  function onCompleted(data) {
    dispatch({
      type: 'USERS FETCHED',
      payload: data.data,
    })
  }

  const onValidated = (component) => {
    // Aca puedes pedir info al backend con debounce.
    // Por ej: para saber si el usuario que se esta tipeando ya esta registrado
    // console.log(component)
    // console.log(component.props.value)
  }

  const onSubmit = (e) => {
    if(submitHandler(e, formData)){
      console.log('paso la validacion')
    }
    // Aca hago la llamada al backend para hacer la accion del submit
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return `Error! ${error}`

  return (
    <div>
      <h5>Lazy Fetch</h5>
      <form onSubmit={onSubmit}>
      {validate('email', onValidated)(
      <input
        type="email"
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
      />)}
      <ErrorComponent field="email" />
      <br />
      {validate('password', onValidated)(
      <input
        type="text"
        value={formData.password}
        onChange={e => setFormData({...formData, password: e.target.value})}
      />)}
      <ErrorComponent field="password" />
      <br />
      <button>Submit</button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <Link to={'/fetch'}>Ir a Fetch</Link>
      <br />
      {hasPermissions(['counter.view'])
        ? <Link to={'/'}>Ir a Counter</Link>
        : <span>Aca iba un link a Counter</span>}
      <br />
      <button onClick={() => myQuery({ page: 1 })}>Fetch con useLazy</button>
      {users.map(user => (
          <h5 key={user.id}>
            <img src={user.avatar} alt={'avatar'} />
            {user.first_name} {user.last_name}
          </h5>
        ))}
    </div>
  )
}

export default LazyFetch
