import usersStore from '../state/usersStore'

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'USERS FETCHED':
      return { ...state, users: action.payload }
    default:
      return usersStore
  }
}

export default usersReducer
