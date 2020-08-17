// Los reducer se deben pensar como casos de uso. NO necesitan seguir la misma estructura que los stores

// Se debe respetar la siguiente convencion de nombres:
// reducer: camelCase con el sufijo Reducer
// action.type: comienzan con el nombre del reducer al que apuntan, sin el sufijo 'Reducer'
// action.type: el prefjio se separa por un espacio del nombre de la accion como tal
// action.type: nombres de reducer con mas de una palabra se separan por un guion
import authReducer from './authReducer'
import counterReducer from './counterReducer'
import usersReducer from './usersReducer'

const slices = {
  authReducer,
  counterReducer,
  usersReducer,
}

const resolveReducers = slices => (state, action) => {
  try {
    let reducerName = action.type.split(' ')[0]
    reducerName = reducerName
      .trim()
      .split('-')
      .map((word, index) => {
        if (index === 0) return word.toLowerCase()
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
    reducerName = `${reducerName.join('')}Reducer`

    return slices[reducerName](state, action)
  } catch (error) {
    throw new Error('The reducer must be included in "slices"')
  }
}

export default resolveReducers(slices)
