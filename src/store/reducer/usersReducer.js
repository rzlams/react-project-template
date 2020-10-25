import usersStore from '../state/usersStore'
import { mergeArrayOfObjects } from '../../utils/merge-array-of-objects'

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'USERS FETCHED':
      return { ...state, users: mergeArrayOfObjects(state.users, action.payload) }
    default:
      return usersStore
  }
}

export default usersReducer
