import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from './reducers'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  data: reducers
})