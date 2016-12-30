import reducer from '../../reducers/rss.reducer'
import Actions from '../../actions/rss.actions'
import Immutable from 'immutable'

describe('User Addresses Reducer tests', () => {
  it('should set rssMap', () => {
    const url = 'test.com'
    const rss = {url, any: 123}
    const state = reducer(undefined, Actions.set(rss, url))
    let a = {}
    a[url] = rss
    expect(state.get('rssMap')).toEqual(Immutable.Map(a))
  })
})
