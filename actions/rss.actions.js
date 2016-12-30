import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetch: ['url'],
  set: ['rss', 'url'],
  requestCompleted: null,
  requestStarted: null
})

export const RssTypes = Types
export default Creators
