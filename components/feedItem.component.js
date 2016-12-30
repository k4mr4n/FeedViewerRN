import React, { Component } from 'react'
import {Text, ScrollView, StyleSheet, View} from 'react-native'

export default class FeedItem extends Component {
  render () {
    const {items} = this.props
    return (
      <ScrollView style={styles.feeds}>
        {items.map(i => <View key={i.link} style={styles.feedItem}>
          <Text style={styles.feedText}>{i.title}</Text>
        </View>)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  feeds: {
    backgroundColor: '#fff',
    paddingVertical: 20
  },
  feedItem: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 2
  },
  feedText: {
    fontSize: 14
  }
})
