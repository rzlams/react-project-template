// Los store se deben pensar como entidades, deben coincidir con las interfaces declaradas en typescript

// Se debe respetar la siguiente convencion de nombres: camelCase con el sufijo Store
import authStore from './authStore'
import counterStore from './counterStore'
import usersStore from './usersStore'

const stores = [authStore, counterStore, usersStore]

const initialState = stores.reduce((r, v) => Object.assign(r, v))

export default initialState
