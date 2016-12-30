import {takeLatest} from 'redux-saga/effects'
import API from '../Api'

/* ------------- Types ------------- */
import { RssTypes } from '../actions/rss.actions'

/* ------------- Sagas ------------- */
import { fetchRss } from './rss.sagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(RssTypes.FETCH, fetchRss)
  ]
}
