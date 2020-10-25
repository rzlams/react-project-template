/*
  |--------------------------------------------------------------------------
  | Stores
  |--------------------------------------------------------------------------
  |
  | Aca se unen los store para armar el state que se consume en context
  | En cada store se debe setear su state inicial, similar a las defaultProps.
  | Se deben nombra con camelCase mas el sufijo 'Store'.
  |
*/

import authStore from './authStore'
import counterStore from './counterStore'
import usersStore from './usersStore'

const stores = [authStore, counterStore, usersStore]

const initialState = stores.reduce((r, v) => Object.assign(r, v))

export default initialState
