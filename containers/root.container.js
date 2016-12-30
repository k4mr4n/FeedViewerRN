import React, { Component } from 'react'
import NavigationRouter from '../navigation/navigationRouter'
import {
  View,
  StyleSheet,
  StatusBar
 } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 20,
    paddingVertical: 5,
    backgroundColor: '#dbdbdb'
  }
})

export default class RootContainer extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default' />
        <View style={styles.header} />
        <NavigationRouter />
      </View>
    )
  }
}
