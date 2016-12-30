import { put } from 'redux-saga/effects'
import RssActions from '../actions/rss.actions'

export function* completed () {
  yield put(RssActions.requestCompleted())
}

/**************
*** REQUEST ***
**************/

export function * fetchRss (action) {
  yield put(RssActions.requestStarted())
  const { url } = action
  const res = yield fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
  const rss = yield res.json()
  yield fetchSuccess(rss)
  yield put(RssActions.requestCompleted())
}

/***************
*** RESPONSE ***
***************/

export function * fetchSuccess (rss) {
  console.log('responseData =>', rss)
  if (rss.status === 'ok') {
    const { url } = rss.feed
    yield put(RssActions.set(rss, url))
  }
}
