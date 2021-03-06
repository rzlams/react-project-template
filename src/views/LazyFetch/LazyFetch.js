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

  const [formData, setFormData] = useState(initialValues)
  const [validate, formErrors, submitHandler] = useValidation({initialValues, validation, onValidated})

  function onCompleted(data) {
    dispatch({
      type: 'USERS FETCHED',
      payload: data.data,
    })
  }

  function onValidated(key, error){
    if(error !== null) return
    // Aca puedes pedir info al backend con debounce.
    // Por ej: para saber si el usuario que se esta tipeando ya esta registrado
    console.log('key: ', key)
  }

  const onSubmit = (e) => {
    if(! submitHandler(e, formData)) return
    // Aca hago la llamada al backend para hacer la accion del submit
    console.log('paso la validacion')
  }

  const onChange = (e) => {
    validate(e.target.name, e.target.value)
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return `Error! ${error}`

  return (
    <div>
      <h5>Lazy Fetch</h5>
      <form onSubmit={onSubmit}>
      <input
        type="text"
        name={'email'}
        value={formData.email}
        onChange={onChange}
      />
      {formErrors && formErrors.email}
      <br />
      <input
        type="text"
        name={'password'}
        value={formData.password}
        onChange={onChange}
      />
      {formErrors && formErrors.password}
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
