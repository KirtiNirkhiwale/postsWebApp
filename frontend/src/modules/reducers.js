import {REGISTER_DATA, LOGIN_DATA, ALL_POST_DATA, DELETE_POST_DATA, INCREMENT_REQUESTED, ADD_POST_DATA, INCREMENT, DECREMENT, DECREMENT_REQUESTED  } from '../actions'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }
    case REGISTER_DATA:
      return {
        ...state,
        registerUserData: action.data
    }
    case LOGIN_DATA:
      return {
        ...state,
        loginUserData: action.data
    }
    case ADD_POST_DATA:
      return {
        ...state,
        addPostData: action.data
    }
    case ALL_POST_DATA:
      return {
        ...state,
        allPostData: action.data
    }
    case DELETE_POST_DATA:
      return {
        ...state,
        deletePostData: action.data
    }
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}
