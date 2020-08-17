import authStore from '../state/authStore'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER FETCHED':
      return { ...state, auth: action.payload }
    default:
      return authStore
  }
}

export default authReducer
