import { isEmail, required } from '../../utils/validation'

export const initialValues = { email: '', password: '' };

export const validation = {
  email: [
    {rule: isEmail, message: 'Debe ser un email!'}
  ],
  password: [
    {rule: required, message: 'El campo es requerido!'}
  ]
}
