import React, { useRef } from 'react'

export const useValidation = (initialValues, validation) => {
  const result = useRef({})

  const validate = (field, onValidated = null, formData = null) => (component) => {
    try {
      const { value } = component.props
      validation[field].forEach(v => {
        if(! v.rule(value) && value !== initialValues[field]){ result.current[field] = v.message }
        else { result.current[field] = null }
      })

      if(onValidated && typeof onValidated === 'function' && value !== initialValues[field]) onValidated(component)
      return component
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = (e, formData) => {
    e.preventDefault()
    // verifico los campos required y que todos los values en el useRef esten null
    Object.keys(validation).forEach(field => {
      validation[field].forEach(v => {
        if(! v.rule(formData[field])){ result.current[field] = v.message }
        else { result.current[field] = null }
      })
    })

    return Object.keys(result.current).every(k => result.current[k] === null)
  }

  const ErrorComponent = (props) => {
/////////////////////////////////////////////////
// NO ESTA LLEGANDO EL result ACTUALIZADO DESDE EL submitHandler
console.log(result.current)
/////////////////////////////////////////////////
  return <span>{result.current[props.field]}</span>
  }

  return [validate, ErrorComponent, submitHandler]
}
