import { createReducer } from 'reduxsauce'
import Immutable from 'immutable'
import {RssTypes as Types} from '../actions/rss.actions'

const INITIAL_STATE = Immutable.fromJS({
  fetching: false,
  rssMap: Immutable.Map({})
})

export const set = (state, { rss, url }) => {
  const map = state.get('rssMap')
  return state.set('rssMap', map.set(url, rss))
}

export const requestCompleted = (state, action) => state.set('fetching', false)

export const requestStarted = (state, action) => state.set('fetching', true)

const reducer = createReducer(INITIAL_STATE, {
  [Types.SET]: set,
  [Types.REQUEST_COMPLETED]: requestCompleted,
  [Types.REQUEST_STARTED]: requestStarted
})

export default reducer
