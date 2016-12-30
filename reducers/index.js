import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas/'

/* ======= Reducers ========== */
import rss from './rss.reducer'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    rss
  })

  return configureStore(rootReducer, rootSaga)
}
