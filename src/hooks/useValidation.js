import { useRef } from 'react'

export const useValidation = ({initialValues, validation, onValidated}) => {
  const errors = useRef({})

  const validate = (key, value) => {
    try {
      validation[key].forEach(v => {
        if(! v.rule(value) && value !== initialValues[key]){ errors.current[key] = v.message }
        else { errors.current[key] = null }
      })

      if(onValidated && typeof onValidated === 'function' && value !== initialValues[key]){
        onValidated(key, errors.current[key])
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const submitHandler = (e, formData) => {
    e.preventDefault()
    Object.keys(validation).forEach(key => {
      validation[key].forEach(v => {
        if(! v.rule(formData[key])){ errors.current[key] = v.message }
        else { errors.current[key] = null }
      })
    })

    //return Object.keys(errors).every(k => errors[k] === null)
  }
console.log(errors.current)
  return [validate, errors.current, submitHandler]
}
