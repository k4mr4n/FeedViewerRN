import React, {Component} from 'react'
import {
  Dimensions,
  View,
  StyleSheet,
  StatusBar,
  Button,
  TextInput
 } from 'react-native'
import { connect } from 'react-redux'
import RssActions from '../actions/rss.actions'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view'
import _ from 'underscore'
import FeedItem from '../components/feedItem.component'
const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

class HomepageScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      index: 0,
      routes: [
        { key: '0', title: '+' },
        { key: '1', title: 'All', items: [] }
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    const obj = this.props.rss.toJS()
    const nObj = nextProps.rss.toJS()
    if (_.isEqual(obj, nObj)) return
    const feed = nObj[this.state.text]
    const {items} = feed
    const title = feed.feed.title.split('-')[0]
    let {routes} = this.state
    routes.push({ key: `${routes.length}`, title, items })
    routes[1].items.push(...items)
    this.setState({routes})
  }

  _buttonPressed () {
    this.props.fetch(this.state.text)
  }

  _handleChangeTab (index) {
    this.setState({ index })
  }

  _renderHeader (props) {
    return (<TabBarTop style={styles.tabBarTop}
      {...props}
      indicatorStyle={{backgroundColor: '#000'}}
      labelStyle={{color: '#000', fontSize: 13}} />)
  }
  _renderAddScene () {
    return (<View style={[ styles.page, { backgroundColor: '#673ab7' } ]}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        placeholder='RSS link'
        value={this.state.text}
      />
      <Button
        onPress={this._buttonPressed.bind(this)}
        title='Get'
        accessibilityLabel='See an informative alert'
        />
    </View>)
  }
  _renderListScene (route) {
    const {items} = route
    if (items.length === 0) return null
    return (<FeedItem items={items} />)
  }
  _renderScene ({ route }) {
    if (route.key === '0') return this._renderAddScene.call(this)
    return this._renderListScene.call(this, route)
  }

  render () {
    return (<TabViewAnimated
      style={styles.container}
      navigationState={this.state}
      renderScene={this._renderScene.bind(this)}
      renderHeader={this._renderHeader}
      onRequestChangeTab={this._handleChangeTab.bind(this)}
      initialLayout={initialLayout} />)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarTop: {
    backgroundColor: '#dbdbdb'
  }
})

const mapStateToDispatch = dispatch => ({
  fetch: (url) => dispatch(RssActions.fetch(url))
})

const mapStateToProps = (state, ownProps) => {
  return {
    rss: state.rss.get('rssMap')
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(HomepageScreen)
