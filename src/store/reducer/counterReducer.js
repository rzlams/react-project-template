import counterStore from '../state/counterStore'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'COUNTER INCREMENT':
      return {
        ...state,
        counter: {
          count: state.counter.count + 1,
        },
      }
    case 'COUNTER DECREMENT':
      return {
        ...state,
        counter: {
          count: state.counter.count - 1,
        },
      }
    default:
      return counterStore
  }
}

export default counterReducer
