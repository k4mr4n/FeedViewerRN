import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// screens identified by the router
import HomepageScreen from '../containers/homepage.container'

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='homepage' hideNavBar component={HomepageScreen} />
      </Router>
    )
  }
}

export default NavigationRouter
